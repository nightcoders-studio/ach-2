import { createServerClient } from "@/lib/supabase/server";
import { UserProfile, UserRole } from "@/types";

/**
 * Retrieves the current authenticated session on the server (RSC compatible).
 * Prevents hydration mismatches by extracting user details directly from server cookies.
 */
export async function getServerSession() {
  try {
    const supabase = await createServerClient();
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error || !session) {
      return null;
    }

    const user = session.user;
    // Map custom metadata role, or default to CUSTOMER
    const role = (user.user_metadata?.role as UserRole) || UserRole.CUSTOMER;

    const profile: UserProfile = {
      id: user.id,
      email: user.email ?? "",
      role,
      fullName: user.user_metadata?.full_name,
      phoneNumber: user.phone,
      avatarUrl: user.user_metadata?.avatar_url,
      createdAt: user.created_at,
    };

    return {
      session,
      user: profile,
    };
  } catch (err) {
    console.error("Error retrieving server session:", err);
    return null;
  }
}
