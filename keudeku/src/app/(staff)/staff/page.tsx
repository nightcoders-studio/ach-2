import Link from "next/link";

/**
 * POS Cashier & Kitchen Staff Hub Scaffold
 */
export default function StaffPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-espresso-950 p-6">
      <div className="w-full max-w-xl rounded-2xl border border-espresso-800 bg-espresso-900 p-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">POS & Kitchen Staff Active</span>
          </div>
          <span className="text-[10px] font-mono text-espresso-400 bg-espresso-950 px-2 py-1 rounded border border-espresso-800">
            STAFF
          </span>
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-espresso-50">POS & Kitchen Hub</h1>
        <p className="mt-2 text-sm leading-relaxed text-espresso-400">
          This scaffold is designed to run the cashiers&apos; POS interface, process cash/QRIS payments, and coordinate the real-time culinary order queue.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 text-xs">
          <div className="rounded-xl bg-espresso-950 p-4 border border-espresso-800">
            <h3 className="font-semibold text-accent-gold">Cashier POS Module</h3>
            <p className="mt-1 text-espresso-400 text-[11px]">Process quick cart payments, issue tickets, and handle receipts.</p>
          </div>
          <div className="rounded-xl bg-espresso-950 p-4 border border-espresso-800">
            <h3 className="font-semibold text-accent-gold">Kitchen Display (KDS)</h3>
            <p className="mt-1 text-espresso-400 text-[11px]">Real-time culinary order pipeline with itemized status changes.</p>
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
