import { useBenefitsStore } from '../store/useBenefitsStore';
import { BENEFITS } from '../mock/benefits';

export default function BenefitList() {
  const category = useBenefitsStore((state) => state.category);
  const selectBenefit = useBenefitsStore((state) => state.selectBenefit);
  const resetToInput = useBenefitsStore((state) => state.resetToInput);

  if (!category) {
    return (
      <div className="text-sm text-slate-300">
        No category selected. Please go back and describe your need again.
      </div>
    );
  }

  const benefits = BENEFITS.filter((b) => b.category === category).slice(0, 4);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold">
            Recommended {category} benefits
          </h2>
          <p className="text-xs text-slate-400">
            Based on your description, these benefits might be relevant.
          </p>
        </div>
        <button
          type="button"
          onClick={resetToInput}
          className="text-xs text-slate-400 hover:text-slate-200 underline underline-offset-4"
        >
          Edit need
        </button>
      </div>

      <div className="grid gap-3">
        {benefits.map((benefit) => (
          <button
            key={benefit.id}
            type="button"
            onClick={() => selectBenefit(benefit)}
            className="text-left rounded-xl border border-slate-700 hover:border-emerald-500/70 hover:bg-slate-900/80 px-4 py-3 transition"
          >
            <h3 className="text-sm font-semibold mb-1">{benefit.title}</h3>
            <p className="text-xs text-emerald-300 mb-1">
              Coverage: {benefit.coverage}
            </p>
            <p className="text-xs text-slate-300">{benefit.description}</p>
          </button>
        ))}
        {benefits.length === 0 && (
          <p className="text-xs text-slate-400">
            No benefits configured for this category yet.
          </p>
        )}
      </div>
    </div>
  );
}
