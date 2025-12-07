import { useBenefitsStore } from '../store/useBenefitsStore';

export default function BenefitInput() {
  const userNeed = useBenefitsStore((state) => state.userNeed);
  const setUserNeed = useBenefitsStore((state) => state.setUserNeed);
  const startClassification = useBenefitsStore((state) => state.startClassification);
  const error = useBenefitsStore((state) => state.error);

  // Auto-clear error when the user types again
  function handleInputChange(e) {
    setUserNeed(e.target.value);

    // clear error as user edits
    if (error) {
      useBenefitsStore.setState({ error: null });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await startClassification();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block text-sm font-medium text-slate-200">
        Describe your health need
      </label>

      <textarea
        value={userNeed}
        onChange={handleInputChange}
        className="w-full h-28 rounded-xl bg-slate-900 border border-slate-700 focus:border-emerald-500 outline-none px-3 py-2 text-sm resize-none"
        placeholder="e.g. I have tooth pain for the last two days, what can I do under my benefits?"
      />

      {error && (
        <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 text-sm font-medium transition"
        >
          Continue
          <span className="text-lg leading-none">→</span>
        </button>
      </div>

      <p className="text-[11px] text-slate-500">
        We&#39;ll classify your need into categories like Dental, Mental Health,
        Vision, or OPD and show matching benefits.
      </p>
    </form>
  );
}
