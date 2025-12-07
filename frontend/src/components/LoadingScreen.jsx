import { useBenefitsStore } from '../store/useBenefitsStore';

export default function LoadingScreen() {
  const userNeed = useBenefitsStore((state) => state.userNeed);

  return (
    <div className="flex flex-col items-center justify-center py-10 gap-4">
      <div className="w-10 h-10 border-4 border-emerald-400/60 border-t-transparent rounded-full animate-spin" />
      <div className="text-center">
        <p className="font-medium">Analyzing your health need…</p>
        <p className="text-xs text-slate-400 mt-1">
          “{userNeed || 'I have tooth pain, what can I do?'}”
        </p>
      </div>
    </div>
  );
}
