// src/store/useBenefitsStore.js
import { create } from 'zustand';
import { classifyNeed, generateActionPlan } from '../services/aiService';

export const useBenefitsStore = create((set, get) => ({
  step: 1,
  userNeed: '',
  category: null,
  selectedBenefit: null,
  actionPlan: [],
  loading: false,
  error: null,

  setUserNeed: (value) => set({ userNeed: value }),

  resetToInput: () =>
    set({
      step: 1,
      category: null,
      selectedBenefit: null,
      actionPlan: [],
      error: null,
    }),

  startClassification: async () => {
    const { userNeed } = get();

    if (!userNeed.trim()) {
      set({ error: 'Please describe your health need.' });
      return;
    }

    try {
      set({ loading: true, error: null, step: 2 });

      const result = await classifyNeed(userNeed);

      // If AI service returns an error object (AI limit exceeded)
      if (result && typeof result === 'object' && result.error === 'AI_LIMIT_EXCEEDED') {
        set({
          error: result.message || 'AI limit exceeded. Please try again later.',
          step: 1,
        });
        return;
      }

      const category = result;

      if (category === 'Unknown') {
        set({
          error:
            "I couldn't clearly understand your need. Try describing it in simpler words.",
          step: 1,
        });
        return;
      }

      set({ category, step: 3 });
    } catch (err) {
      console.error(err);
      set({
        error: 'Something went wrong while classifying. Please try again.',
        step: 1,
      });
    } finally {
      set({ loading: false });
    }
  },

  _loadPlanForBenefit: async (benefit) => {
    const { userNeed } = get();
    try {
      set({ loading: true, error: null });

      const result = await generateActionPlan(userNeed, benefit);

      // If AI service returns an error object (AI limit exceeded)
      if (result && typeof result === 'object' && result.error === 'AI_LIMIT_EXCEEDED') {
        set({
          error: result.message || 'AI limit exceeded. Please try again later.',
          actionPlan: [],
        });
        return;
      }

      const steps = result;
      set({ actionPlan: steps || [] });
    } catch (err) {
      console.error(err);
      set({
        error: 'Failed to generate an action plan. Please try again.',
        actionPlan: [],
      });
    } finally {
      set({ loading: false });
    }
  },

  selectBenefit: async (benefit) => {
    set({ selectedBenefit: benefit, step: 4 });
    await get()._loadPlanForBenefit(benefit);
  },

  regeneratePlan: async () => {
    const { selectedBenefit } = get();
    if (!selectedBenefit) return;
    await get()._loadPlanForBenefit(selectedBenefit);
  },

  goBackToBenefits: () =>
    set({
      step: 3,
      selectedBenefit: null,
      actionPlan: [],
      error: null,
    }),
}));
