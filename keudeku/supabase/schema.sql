-- ==========================================
-- KEUDEKU REAL-TIME F&B DATABASE SCHEMA
-- Production-Ready, Multi-Tenant & Scalable
-- Compatible with Supabase PostgreSQL & Auth
-- ==========================================

-- ------------------------------------------
-- 1. DATABASE CUSTOM TYPES (ENUMS)
-- ------------------------------------------

CREATE TYPE public.user_role AS ENUM (
  'SUPER_ADMIN',
  'OWNER',
  'STAFF',
  'CUSTOMER'
);

CREATE TYPE public.order_status AS ENUM (
  'PENDING',
  'CONFIRMED',
  'COOKING',
  'READY',
  'SERVED',
  'PAID',
  'COMPLETED',
  'CANCELLED'
);

CREATE TYPE public.payment_method AS ENUM (
  'CASH',
  'QRIS',
  'EWALLET'
);

CREATE TYPE public.payment_status AS ENUM (
  'PENDING',
  'PAID',
  'FAILED'
);

CREATE TYPE public.event_type AS ENUM (
  'VIEW_MENU',
  'ADD_TO_CART',
  'ORDER_CREATED',
  'PAYMENT_SUCCESS',
  'ITEM_RATED'
);

-- ------------------------------------------
-- 2. TABLE INITIATIONS
-- ------------------------------------------

-- Table: Users (Profiles mapped to auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  avatar_url TEXT,
  role public.user_role NOT NULL DEFAULT 'CUSTOMER',
  outlet_id UUID, -- Added FK constraint later after Outlets is created
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: Outlets (F&B Restaurant Branches)
CREATE TABLE public.outlets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  address TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Resolve Users -> Outlets circular reference
ALTER TABLE public.users
  ADD CONSTRAINT fk_users_outlet
  FOREIGN KEY (outlet_id) REFERENCES public.outlets(id) ON DELETE SET NULL;

-- Table: Tables (Restaurant seating & scanning)
CREATE TABLE public.tables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  outlet_id UUID NOT NULL REFERENCES public.outlets(id) ON DELETE CASCADE,
  table_number VARCHAR(50) NOT NULL,
  qr_code VARCHAR(255) UNIQUE NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT unique_outlet_table_number UNIQUE (outlet_id, table_number)
);

-- Table: Menu Items (Food & Beverages Catalog)
CREATE TABLE public.menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  outlet_id UUID NOT NULL REFERENCES public.outlets(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(12, 2) NOT NULL CHECK (price >= 0),
  category VARCHAR(100) NOT NULL,
  image_url TEXT,
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: Orders (Cart, Cooking & Fulfilled orders)
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  outlet_id UUID NOT NULL REFERENCES public.outlets(id) ON DELETE CASCADE,
  table_id UUID NOT NULL REFERENCES public.tables(id) ON DELETE RESTRICT,
  customer_id UUID REFERENCES public.users(id) ON DELETE SET NULL, -- Nullable for anonymous table guests
  status public.order_status NOT NULL DEFAULT 'PENDING',
  total_amount DECIMAL(12, 2) NOT NULL DEFAULT 0.00 CHECK (total_amount >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: Order Items (Baskets within orders)
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  menu_item_id UUID NOT NULL REFERENCES public.menu_items(id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price_snapshot DECIMAL(12, 2) NOT NULL CHECK (price_snapshot >= 0), -- Vital audit data
  notes TEXT, -- Customer requests (e.g. "no spicy")
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: Payments (Carts checkout tracking)
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE RESTRICT,
  method public.payment_method NOT NULL DEFAULT 'QRIS',
  amount DECIMAL(12, 2) NOT NULL CHECK (amount > 0),
  status public.payment_status NOT NULL DEFAULT 'PENDING',
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: Events (Analytics & AI Recommendation Logs)
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  outlet_id UUID NOT NULL REFERENCES public.outlets(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL, -- Nullable for non-logged-in customers
  event_type public.event_type NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------
-- 3. INDEXING STRATEGY (PERFORMANCE)
-- ------------------------------------------

CREATE INDEX idx_orders_outlet_id ON public.orders(outlet_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_menu_items_outlet_id ON public.menu_items(outlet_id);
CREATE INDEX idx_tables_outlet_id ON public.tables(outlet_id);
CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_payments_order_id ON public.payments(order_id);
CREATE INDEX idx_events_outlet_id ON public.events(outlet_id);
CREATE INDEX idx_events_event_type ON public.events(event_type);

-- ------------------------------------------
-- 4. CONTEXT ACCESS DEFINE HELPERS (RLS AUDIT)
-- ------------------------------------------

-- Caches active auth role to avoid RLS recursion loops
CREATE OR REPLACE FUNCTION public.get_auth_user_role()
RETURNS public.user_role
LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  SELECT role FROM public.users WHERE id = auth.uid();
$$;

-- Caches active auth outlet_id to avoid RLS recursion loops
CREATE OR REPLACE FUNCTION public.get_auth_user_outlet_id()
RETURNS UUID
LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  SELECT outlet_id FROM public.users WHERE id = auth.uid();
$$;

-- ------------------------------------------
-- 5. BUSINESS RULES TRIGGER CHECKS
-- ------------------------------------------

-- Trigger: Restricts STAFF updates strictly to toggling availability
CREATE OR REPLACE FUNCTION public.enforce_staff_menu_restrictions()
RETURNS TRIGGER AS $$
BEGIN
  IF public.get_auth_user_role() = 'STAFF' THEN
    IF OLD.name <> NEW.name OR
       OLD.description <> NEW.description OR
       OLD.price <> NEW.price OR
       OLD.category <> NEW.category OR
       OLD.image_url <> NEW.image_url OR
       OLD.outlet_id <> NEW.outlet_id THEN
      RAISE EXCEPTION 'Access Denied: Staff roles are only permitted to toggle active availability status.';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trigger_enforce_staff_menu_restrictions
BEFORE UPDATE ON public.menu_items
FOR EACH ROW EXECUTE FUNCTION public.enforce_staff_menu_restrictions();

-- Trigger: Validates strict state transitions for F&B Orders
CREATE OR REPLACE FUNCTION public.validate_order_status_transition()
RETURNS TRIGGER AS $$
BEGIN
  -- Super Admins are granted override paths
  IF public.get_auth_user_role() = 'SUPER_ADMIN' THEN
    RETURN NEW;
  END IF;

  -- Verify initial status setting
  IF TG_OP = 'INSERT' THEN
    IF NEW.status NOT IN ('PENDING', 'CONFIRMED') THEN
      RAISE EXCEPTION 'Invalid State: Initial order statuses must begin with PENDING or CONFIRMED.';
    END IF;
    RETURN NEW;
  END IF;

  -- Validate updating pathways
  IF OLD.status <> NEW.status THEN
    -- Cancel permissions are validated during preparatory stages
    IF NEW.status = 'CANCELLED' AND OLD.status IN ('PENDING', 'CONFIRMED', 'COOKING') THEN
      RETURN NEW;
    END IF;

    -- Strict F&B operational path checking
    IF NOT (
      (OLD.status = 'PENDING' AND NEW.status = 'CONFIRMED') OR
      (OLD.status = 'CONFIRMED' AND NEW.status = 'COOKING') OR
      (OLD.status = 'COOKING' AND NEW.status = 'READY') OR
      (OLD.status = 'READY' AND NEW.status = 'SERVED') OR
      (OLD.status = 'SERVED' AND NEW.status = 'PAID') OR
      (OLD.status = 'PAID' AND NEW.status = 'COMPLETED')
    ) THEN
      RAISE EXCEPTION 'Workflow Error: Invalid F&B state transition from % to %.', OLD.status, NEW.status;
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trigger_validate_order_status_transition
BEFORE INSERT OR UPDATE ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.validate_order_status_transition();

-- ------------------------------------------
-- 6. ROW-LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------

-- Table RLS: Users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow matching select profiles"
  ON public.users FOR SELECT
  USING (auth.uid() = id OR public.get_auth_user_role() IN ('SUPER_ADMIN', 'OWNER', 'STAFF'));

CREATE POLICY "Allow public registers insert"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Allow self/owner profiles updates"
  ON public.users FOR UPDATE
  USING (auth.uid() = id OR public.get_auth_user_role() IN ('SUPER_ADMIN', 'OWNER'));

-- Table RLS: Outlets
ALTER TABLE public.outlets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow active select access"
  ON public.outlets FOR SELECT
  USING (is_active = TRUE OR public.get_auth_user_role() IN ('SUPER_ADMIN', 'OWNER', 'STAFF'));

CREATE POLICY "Allow global admin full control"
  ON public.outlets FOR ALL
  USING (public.get_auth_user_role() = 'SUPER_ADMIN');

CREATE POLICY "Allow owner update outlet details"
  ON public.outlets FOR UPDATE
  USING (auth.uid() = owner_id);

-- Table RLS: Tables
ALTER TABLE public.tables ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow active tables reads"
  ON public.tables FOR SELECT
  USING (is_active = TRUE OR public.get_auth_user_role() IN ('SUPER_ADMIN', 'OWNER', 'STAFF'));

CREATE POLICY "Allow outlet owners tables full control"
  ON public.tables FOR ALL
  USING (public.get_auth_user_role() = 'SUPER_ADMIN' OR (public.get_auth_user_role() = 'OWNER' AND public.get_auth_user_outlet_id() = outlet_id));

-- Table RLS: Menu Items
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public active menu items browsing"
  ON public.menu_items FOR SELECT
  USING (is_available = TRUE OR public.get_auth_user_role() IN ('SUPER_ADMIN', 'OWNER', 'STAFF'));

CREATE POLICY "Allow outlet owners full menu items control"
  ON public.menu_items FOR ALL
  USING (public.get_auth_user_role() = 'SUPER_ADMIN' OR (public.get_auth_user_role() = 'OWNER' AND public.get_auth_user_outlet_id() = outlet_id));

CREATE POLICY "Allow outlet staff toggle availability status"
  ON public.menu_items FOR UPDATE
  USING (public.get_auth_user_role() = 'STAFF' AND public.get_auth_user_outlet_id() = outlet_id);

-- Table RLS: Orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow customer select own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = customer_id);

CREATE POLICY "Allow customer create own table orders"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = customer_id OR customer_id IS NULL);

CREATE POLICY "Allow outlet members read orders"
  ON public.orders FOR SELECT
  USING (public.get_auth_user_role() = 'SUPER_ADMIN' OR (public.get_auth_user_role() IN ('OWNER', 'STAFF') AND public.get_auth_user_outlet_id() = outlet_id));

CREATE POLICY "Allow outlet members updates orders status"
  ON public.orders FOR UPDATE
  USING (public.get_auth_user_role() = 'SUPER_ADMIN' OR (public.get_auth_user_role() IN ('OWNER', 'STAFF') AND public.get_auth_user_outlet_id() = outlet_id));

-- Table RLS: Order Items
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow customers or outlet members view items"
  ON public.order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE orders.id = order_id 
        AND (orders.customer_id = auth.uid() 
             OR public.get_auth_user_role() = 'SUPER_ADMIN'
             OR (public.get_auth_user_role() IN ('OWNER', 'STAFF') AND orders.outlet_id = public.get_auth_user_outlet_id()))
    )
  );

CREATE POLICY "Allow customers insert items to their orders"
  ON public.order_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE orders.id = order_id 
        AND (orders.customer_id = auth.uid() OR orders.customer_id IS NULL)
    )
  );

-- Table RLS: Payments
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow customers or outlet members view billing details"
  ON public.payments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_id
        AND (orders.customer_id = auth.uid()
             OR public.get_auth_user_role() = 'SUPER_ADMIN'
             OR (public.get_auth_user_role() IN ('OWNER', 'STAFF') AND orders.outlet_id = public.get_auth_user_outlet_id()))
    )
  );

CREATE POLICY "Allow customers insert bill checkouts"
  ON public.payments FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_id
        AND (orders.customer_id = auth.uid() OR orders.customer_id IS NULL)
    )
  );

CREATE POLICY "Allow cashiers update payment updates"
  ON public.payments FOR UPDATE
  USING (
    public.get_auth_user_role() = 'SUPER_ADMIN'
    OR EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_id
        AND public.get_auth_user_role() IN ('OWNER', 'STAFF')
        AND orders.outlet_id = public.get_auth_user_outlet_id()
    )
  );

-- Table RLS: Events
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous/users triggers write events logs"
  ON public.events FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Allow outlet members read analytics events details"
  ON public.events FOR SELECT
  USING (public.get_auth_user_role() = 'SUPER_ADMIN' OR (public.get_auth_user_role() IN ('OWNER', 'STAFF') AND public.get_auth_user_outlet_id() = outlet_id));

-- ------------------------------------------
-- 7. SUPABASE REALTIME REPLICATIONS
-- ------------------------------------------

ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.order_items;
ALTER PUBLICATION supabase_realtime ADD TABLE public.payments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.menu_items;
