import { useBenefitsStore } from '../store/useBenefitsStore';

export default function BenefitDetails() {
  const selectedBenefit = useBenefitsStore((state) => state.selectedBenefit);
  const actionPlan = useBenefitsStore((state) => state.actionPlan);
  const loading = useBenefitsStore((state) => state.loading);
  const error = useBenefitsStore((state) => state.error);
  const regeneratePlan = useBenefitsStore((state) => state.regeneratePlan);
  const resetToInput = useBenefitsStore((state) => state.resetToInput);
  const goBackToBenefits = useBenefitsStore((state) => state.goBackToBenefits);

  if (!selectedBenefit) {
    return (
      <p className="text-sm text-slate-300">
        No benefit selected. Please go back and choose a benefit.
      </p>
    );
  }

  return (
    <div className="space-y-4">

      {/* Start Over */}
      <button
        type="button"
        onClick={resetToInput}
        className="text-xs text-slate-400 hover:text-slate-100 underline underline-offset-4"
      >
        ← Start over
      </button>

      {/* NEW BUTTON: Pick another benefit */}
      <button
        type="button"
        onClick={goBackToBenefits}
        className="text-xs text-emerald-300 hover:text-emerald-200 underline underline-offset-4 ml-4"
      >
        Pick another benefit
      </button>

      <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4 space-y-2">
        <h2 className="text-lg font-semibold">{selectedBenefit.title}</h2>
        <p className="text-xs text-emerald-300">
          Coverage: {selectedBenefit.coverage}
        </p>
        <p className="text-xs text-slate-300">{selectedBenefit.description}</p>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">How to avail this benefit</h3>
        <button
          type="button"
          onClick={regeneratePlan}
          className="text-xs px-3 py-1 rounded-full border border-slate-700 hover:border-emerald-500/70 hover:bg-slate-900"
        >
          Regenerate plan
        </button>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <div className="w-4 h-4 rounded-full border-2 border-emerald-400/70 border-t-transparent animate-spin" />
          Generating a step-by-step action plan…
        </div>
      )}

      {error && (
        <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      {!loading && actionPlan.length > 0 && (
        <ol className="space-y-2 text-sm text-slate-200 list-decimal list-inside">
          {actionPlan.map((step, idx) => (
            <li key={idx} className="pl-1">
              {step}
            </li>
          ))}
        </ol>
      )}

      {!loading && !error && actionPlan.length === 0 && (
        <p className="text-xs text-slate-400">
          No plan yet. Click “Regenerate plan” if this persists.
        </p>
      )}
    </div>
  );
}
