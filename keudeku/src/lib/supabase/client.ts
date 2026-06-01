import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

/**
 * Creates a browser-compatible Supabase client instance.
 * Automatically manages session state persistence in local/session storage.
 */
export const createClient = () => createBrowserClient(supabaseUrl, supabaseAnonKey);
