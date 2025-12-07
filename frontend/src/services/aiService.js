// src/services/aiService.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// -------------------------------
// CLASSIFY NEED
// -------------------------------
export async function classifyNeed(userNeed) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/classify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userNeed }),
    });

    if (res.status === 429) {
      let data = {};
      try {
        data = await res.json();
      } catch {}
      return {
        error: 'AI_LIMIT_EXCEEDED',
        message: data.message || 'AI limit exceeded. Please try again later.',
      };
    }

    if (!res.ok) {
      throw new Error(`Failed to classify. Status: ${res.status}`);
    }

    const data = await res.json();
    return data?.category || 'Unknown';
  } catch {
    return 'Unknown';
  }
}

// -------------------------------
// GENERATE ACTION PLAN
// -------------------------------
export async function generateActionPlan(userNeed, benefit) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/plan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userNeed, benefit }),
    });

    if (res.status === 429) {
      let data = {};
      try {
        data = await res.json();
      } catch {}
      return {
        error: 'AI_LIMIT_EXCEEDED',
        message: data.message || 'AI limit exceeded. Please try again later.',
      };
    }

    if (!res.ok) {
      throw new Error(`Failed to generate plan. Status: ${res.status}`);
    }

    const data = await res.json();
    return Array.isArray(data?.steps) ? data.steps : [];
  } catch {
    return [
      'Sorry, something went wrong while generating the plan.',
      'Please try again later.',
    ];
  }
}
