// src/App.jsx
import React from 'react';
import { useBenefitsStore } from './store/useBenefitsStore';
import Layout from './components/Layout';
import BenefitInput from './components/BenefitInput';
import BenefitList from './components/BenefitList';
import BenefitDetails from './components/BenefitDetails';
import LoadingScreen from './components/LoadingScreen';

function StepRenderer() {
  const step = useBenefitsStore((state) => state.step);

  if (step === 2) return <LoadingScreen />;
  if (step === 1) return <BenefitInput />;
  if (step === 3) return <BenefitList />;
  if (step === 4) return <BenefitDetails />;
  return null;
}

function AppInner() {
  const step = useBenefitsStore((state) => state.step);
  const category = useBenefitsStore((state) => state.category);

  const stepLabels = ['Describe need', 'AI classifies', 'Pick benefit', 'Action plan'];

  return (
    <Layout>
      {/* Stepper */}
      <div className="flex items-center gap-2 mb-6">
        {stepLabels.map((label, index) => {
          const s = index + 1;
          const active = s <= step;
          return (
            <div key={label} className="flex items-center gap-1">
              <div
                className={`w-6 h-6 rounded-full text-[11px] flex items-center justify-center border ${
                  active
                    ? 'bg-emerald-500 text-slate-900 border-emerald-400'
                    : 'bg-slate-900 text-slate-500 border-slate-700'
                }`}
              >
                {s}
              </div>
              <span className="text-[11px] text-slate-400">{label}</span>
              {index < stepLabels.length - 1 && (
                <div className="w-6 h-px bg-slate-700" />
              )}
            </div>
          );
        })}
      </div>

      {step === 3 && category && (
        <p className="mb-3 text-xs text-slate-400">
          Classified as{' '}
          <span className="font-medium text-emerald-300">{category}</span>
        </p>
      )}

      <StepRenderer />
    </Layout>
  );
}

export default function App() {
  return <AppInner />;
}
