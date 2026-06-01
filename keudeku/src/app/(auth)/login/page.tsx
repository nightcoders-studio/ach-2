import Link from "next/link";

/**
 * Authentication Gate Portal Scaffold
 */
export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-espresso-950 p-6">
      <div className="w-full max-w-md rounded-2xl border border-espresso-800 bg-espresso-900 p-8 shadow-2xl">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-accent-gold animate-pulse" />
          <span className="text-xs font-mono tracking-widest text-accent-gold uppercase">Infrastructure Ready</span>
        </div>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-espresso-50">KeudeKu Auth Portal</h1>
        <p className="mt-1 text-sm text-espresso-400">Secure login gateway for UMKM operators & guests.</p>
        
        <div className="mt-8 space-y-4">
          <div className="rounded-xl bg-espresso-950 p-4 border border-espresso-800 text-xs leading-relaxed text-espresso-300">
            <div className="flex items-center justify-between border-b border-espresso-800 pb-2 mb-2">
              <span className="font-mono text-espresso-400">RBAC Strategy:</span>
              <span className="font-semibold text-accent-gold text-[10px] px-1.5 py-0.5 rounded bg-espresso-900 border border-espresso-800">GOOGLE OAUTH</span>
            </div>
            Ready for integration with Supabase Auth providers.
          </div>
          
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent-gold py-3 text-sm font-semibold text-espresso-950 hover:bg-accent-amber transition-all shadow-md active:scale-95 cursor-pointer">
            Sign In with Google
          </button>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-xs text-espresso-400 hover:text-accent-gold transition-colors">
            &larr; Back to System Scaffold Status
          </Link>
        </div>
      </div>
    </div>
  );
}
