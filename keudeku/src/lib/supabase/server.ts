import { createServerClient as createClientInstance } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

/**
 * Creates a server-compatible Supabase client instance.
 * Accesses cookies asynchronously (Next.js 15+ compatible) for secure session rotation.
 */
export async function createServerClient() {
  const cookieStore = await cookies();

  return createClientInstance(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Under Next.js rules, writing to cookies is not permitted in plain Server Components.
            // This is ignored as long as you have middleware refreshing user sessions.
          }
        },
      },
    }
  );
}
