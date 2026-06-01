import Link from "next/link";

/**
 * Customer Smart Table & Menu Portal Scaffold
 */
export default function CustomerPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-espresso-950 p-6">
      <div className="w-full max-w-xl rounded-2xl border border-espresso-800 bg-espresso-900 p-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">Customer Portal Active</span>
          </div>
          <span className="text-[10px] font-mono text-espresso-400 bg-espresso-950 px-2 py-1 rounded border border-espresso-800">
            CUSTOMER
          </span>
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-espresso-50">QR Table & Menu</h1>
        <p className="mt-2 text-sm leading-relaxed text-espresso-400">
          This scaffold is pre-configured for digital menu ordering, guest table sessions, Cart additions, and local loyalty points accrual.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 text-xs">
          <div className="rounded-xl bg-espresso-950 p-4 border border-espresso-800">
            <h3 className="font-semibold text-accent-gold">Smart Table Menu</h3>
            <p className="mt-1 text-espresso-400 text-[11px]">Instantly render QR-triggered localized menus.</p>
          </div>
          <div className="rounded-xl bg-espresso-950 p-4 border border-espresso-800">
            <h3 className="font-semibold text-accent-gold">Cart & Order Hub</h3>
            <p className="mt-1 text-espresso-400 text-[11px]">Real-time transactional ordering pipeline.</p>
          </div>
        </div>

        <div className="mt-8 border-t border-espresso-800 pt-6 text-center">
          <Link href="/" className="text-xs text-espresso-400 hover:text-accent-gold transition-colors">
            &larr; Back to System Scaffold Status
          </Link>
        </div>
      </div>
    </div>
  );
}
