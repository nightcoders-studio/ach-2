"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { UserProfile, UserRole } from "@/types";
import { Session } from "@supabase/supabase-js";

/**
 * Custom hook to consume and control Supabase Auth session updates inside client components.
 */
export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const supabase = createClient();

  const handleUserMapping = useCallback((currentSession: Session | null): UserProfile | null => {
    if (!currentSession?.user) return null;
    const { user: supabaseUser } = currentSession;
    return {
      id: supabaseUser.id,
      email: supabaseUser.email ?? "",
      role: (supabaseUser.user_metadata?.role as UserRole) || UserRole.CUSTOMER,
      fullName: supabaseUser.user_metadata?.full_name,
      phoneNumber: supabaseUser.phone,
      avatarUrl: supabaseUser.user_metadata?.avatar_url,
      createdAt: supabaseUser.created_at,
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    // Fetch initial auth session
    const getInitialSession = async () => {
      try {
        const {
          data: { session: currentSession },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) throw sessionError;

        if (isMounted) {
          setSession(currentSession);
          setUser(handleUserMapping(currentSession));
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("Failed to load initial session"));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getInitialSession();

    // Subscribe to auth state updates in realtime
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (isMounted) {
        setSession(currentSession);
        setUser(handleUserMapping(currentSession));
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [supabase.auth, handleUserMapping]);

  // Google OAuth triggers
  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to sign in with Google"));
      setLoading(false);
      throw err;
    }
  };

  // Sign out triggers
  const signOut = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setSession(null);
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to sign out"));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    session,
    user,
    loading,
    error,
    signInWithGoogle,
    signOut,
    isAuthenticated: !!session,
  };
}
