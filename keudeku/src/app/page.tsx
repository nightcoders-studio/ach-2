"use client";

import { useState } from "react";
import Link from "next/link";
import { UserRole } from "@/types";
import { ROLE_HIERARCHY, ROLE_ROUTES } from "@/lib/auth/roles";

/**
 * KeudeKu Developer Foundation Dashboard
 * Interactive dashboard validating the core Next.js + Tailwind v4 + Supabase architecture.
 */
export default function Home() {
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.CUSTOMER);

  // Check env presence on client
  const envStatus = {
    url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    urlValue: process.env.NEXT_PUBLIC_SUPABASE_URL || "Not configured",
  };


  const hasAccess = (userRole: UserRole, targetRole: UserRole) => {
    return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[targetRole];
  };

  return (
    <main className="flex min-h-screen flex-col bg-espresso-950 p-6 md:p-12">
      {/* Premium Header */}
      <header className="mx-auto w-full max-w-6xl border-b border-espresso-800 pb-6 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-espresso-900 border border-espresso-800 px-3 py-1 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-gold"></span>
            </span>
            <span className="font-mono text-accent-gold uppercase tracking-wider text-[10px]">Scaffold Foundation Active</span>
          </div>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-espresso-50">
            KeudeKu <span className="font-light text-espresso-300">Core</span>
          </h1>
          <p className="mt-2 text-sm text-espresso-400 max-w-xl">
            A production-ready F&B Management framework for Indonesian UMKM. Scaled for real-time table orders, POS, kitchen flows, and analytics.
          </p>
        </div>
        
        {/* Quick Tech Badge Grid */}
        <div className="flex flex-wrap gap-2">
          {["Next.js 16 (App Router)", "TypeScript Strict", "Tailwind CSS v4", "Supabase SDK v2", "RBAC Core Ready"].map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md bg-espresso-900 border border-espresso-850 text-espresso-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </header>

      {/* Main Control Panel Dashboard */}
      <div className="mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: System Scaffolding Checks */}
        <section className="lg:col-span-7 space-y-6">
          
          {/* Architecture Verification */}
          <div className="rounded-2xl border border-espresso-800 bg-espresso-900 p-6 shadow-xl">
            <h2 className="text-lg font-bold tracking-tight text-espresso-50 border-b border-espresso-800 pb-3">
              1. Modular Architecture Routing
            </h2>
            <p className="mt-2 text-xs text-espresso-400">
              Interactive route groups represent separated security layers. Click below to verify compiling:
            </p>
            
            <div className="mt-6 space-y-3">
              {[
                { name: "Customer Portal", path: "/customer", group: "/(customer)", role: UserRole.CUSTOMER, desc: "QR Menu, cart & local ordering" },
                { name: "Kitchen & Staff Hub", path: "/staff", group: "/(staff)", role: UserRole.STAFF, desc: "Order fulfillment & Cashier POS" },
                { name: "Owner Analytics", path: "/owner", group: "/(owner)", role: UserRole.OWNER, desc: "Revenue stats, bestsellers & menu dispatch" },
                { name: "Super Admin Console", path: "/admin", group: "/(admin)", role: UserRole.SUPER_ADMIN, desc: "Merchant onboarding & system license audits" },
                { name: "Authentication Portal", path: "/login", group: "/(auth)", role: null, desc: "Secure OAuth gateway" },
              ].map((route) => (
                <div 
                  key={route.name}
                  className="flex flex-col md:flex-row md:items-center justify-between p-3.5 rounded-xl bg-espresso-950 border border-espresso-800 hover:border-accent-gold transition-all group"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-espresso-200 group-hover:text-accent-gold transition-colors">{route.name}</span>
                      <span className="font-mono text-[9px] text-espresso-500 bg-espresso-900 border border-espresso-850 px-1.5 py-0.5 rounded">{route.group}</span>
                    </div>
                    <p className="text-[10px] text-espresso-400 mt-0.5">{route.desc}</p>
                  </div>
                  <Link 
                    href={route.path}
                    className="mt-3 md:mt-0 px-3 py-1.5 text-center text-xs font-semibold rounded bg-espresso-900 text-accent-gold hover:bg-accent-gold hover:text-espresso-950 border border-espresso-800 hover:border-transparent transition-all"
                  >
                    Launch Route &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Directory Scaffolding Status */}
          <div className="rounded-2xl border border-espresso-800 bg-espresso-900 p-6 shadow-xl">
            <h2 className="text-lg font-bold tracking-tight text-espresso-50 border-b border-espresso-800 pb-3">
              2. Core Infrastructure Files
            </h2>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { file: "types/index.ts", desc: "Unified RBAC schema" },
                { file: "lib/supabase/client.ts", desc: "Browser client SDK" },
                { file: "lib/supabase/server.ts", desc: "RSC Server Client SDK" },
                { file: "lib/auth/roles.ts", desc: "Permissions & redirection" },
                { file: "lib/auth/session.ts", desc: "Async cookie retrieval" },
                { file: "hooks/useAuth.ts", desc: "Dynamic React state auth" },
                { file: "middleware.ts", desc: "Edge token refreshes" },
                { file: "styles/globals.css", desc: "Tailwind v4 theme styles" },
                { file: "tsconfig.json", desc: "Enforces strict: true" },
              ].map((item) => (
                <div key={item.file} className="p-3 bg-espresso-950 rounded-xl border border-espresso-850">
                  <div className="flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="font-mono font-bold text-[10px] text-espresso-200">{item.file}</span>
                  </div>
                  <p className="text-[9px] text-espresso-400 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* Right Side: Supabase Status & Interactive RBAC Simulation */}
        <section className="lg:col-span-5 space-y-6">

          {/* Supabase Connectivity Verification */}
          <div className="rounded-2xl border border-espresso-800 bg-espresso-900 p-6 shadow-xl">
            <h2 className="text-lg font-bold tracking-tight text-espresso-50 border-b border-espresso-800 pb-3">
              3. Supabase Integration Setup
            </h2>
            
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-espresso-950 border border-espresso-800">
                <span className="text-xs text-espresso-300">NEXT_PUBLIC_SUPABASE_URL</span>
                <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${
                  envStatus.url 
                    ? "bg-emerald-950 border-emerald-800 text-emerald-400" 
                    : "bg-amber-950 border-amber-800 text-amber-400"
                }`}>
                  {envStatus.url ? "DETECTED" : "PLACEHOLDER ACTIVE"}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-espresso-950 border border-espresso-800">
                <span className="text-xs text-espresso-300">NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
                <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${
                  envStatus.anonKey 
                    ? "bg-emerald-950 border-emerald-800 text-emerald-400" 
                    : "bg-amber-950 border-amber-800 text-amber-400"
                }`}>
                  {envStatus.anonKey ? "DETECTED" : "PLACEHOLDER ACTIVE"}
                </span>
              </div>

              <div className="p-3.5 bg-espresso-950 rounded-xl border border-espresso-800 text-[11px] leading-relaxed text-espresso-400">
                <span className="font-bold text-accent-gold">Connection Check:</span> Browser clients instantiate without compilation breaks. Set up your live keys inside <span className="font-mono text-espresso-300">.env.local</span> to start real data synchronization.
              </div>
            </div>
          </div>

          {/* Interactive RBAC Simulator */}
          <div className="rounded-2xl border border-espresso-800 bg-espresso-900 p-6 shadow-xl">
            <h2 className="text-lg font-bold tracking-tight text-espresso-50 border-b border-espresso-800 pb-3">
              4. RBAC Simulation Gate
            </h2>
            <p className="mt-2 text-xs text-espresso-400">
              Mock user role configurations inside client actions to preview permissions clearance logic:
            </p>

            {/* Dropdown Role Selector */}
            <div className="mt-4">
              <label className="text-[10px] font-mono uppercase tracking-wider text-espresso-400 block mb-1.5">Simulate User Active Role:</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                className="w-full rounded-xl bg-espresso-950 border border-espresso-800 px-3 py-2.5 text-xs text-espresso-100 focus:outline-none focus:border-accent-gold"
              >
                {Object.values(UserRole).map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            {/* Clearance Indicators */}
            <div className="mt-6 space-y-2.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-espresso-400 block">Clearance Map for {selectedRole}:</span>
              
              {[
                { label: "Customer Route Access (min. CUSTOMER)", roleRequired: UserRole.CUSTOMER },
                { label: "Staff/KDS/POS Access (min. STAFF)", roleRequired: UserRole.STAFF },
                { label: "Owner Dashboard Access (min. OWNER)", roleRequired: UserRole.OWNER },
                { label: "Global Admin Access (min. SUPER_ADMIN)", roleRequired: UserRole.SUPER_ADMIN },
              ].map((perm) => {
                const granted = hasAccess(selectedRole, perm.roleRequired);
                return (
                  <div 
                    key={perm.label} 
                    className={`flex items-center justify-between p-3 rounded-xl border text-[11px] ${
                      granted 
                        ? "bg-emerald-950/20 border-emerald-900/60 text-emerald-200" 
                        : "bg-rose-950/10 border-rose-900/40 text-espresso-400 line-through decoration-espresso-800"
                    }`}
                  >
                    <span>{perm.label}</span>
                    <span className={`font-mono font-bold text-[9px] px-1.5 py-0.5 rounded ${
                      granted ? "bg-emerald-900 text-emerald-300" : "bg-rose-950 text-rose-400"
                    }`}>
                      {granted ? "GRANTED" : "DENIED"}
                    </span>
                  </div>
                );
              })}
            </div>
            
            {/* Auto Redirect Mock Button */}
            <div className="mt-6">
              <Link
                href={ROLE_ROUTES[selectedRole]}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent-gold py-2.5 text-xs font-semibold text-espresso-950 hover:bg-accent-amber transition-colors active:scale-95 text-center"
              >
                Go to {selectedRole} Portal (Auto-route)
              </Link>
            </div>

          </div>

        </section>

      </div>

      {/* Footer Design */}
      <footer className="mx-auto w-full max-w-6xl mt-12 pt-6 border-t border-espresso-850 text-center text-[10px] font-mono text-espresso-500">
        KeudeKu &bull; UMKM Real-Time F&B Platform Core Scaffolding Core Engine &copy; 2026.
      </footer>
    </main>
  );
}
