// src/services/aiService.js

const API_BASE_URL = 'http://localhost:5000';

// Helper to log nicely
function log(...args) {
  console.log('[aiService]', ...args);
}

// -------------------------------
// CLASSIFY NEED
// -------------------------------
export async function classifyNeed(userNeed) {
  log('classifyNeed called with:', userNeed);

  try {
    const url = `${API_BASE_URL}/api/classify`;
    const payload = { userNeed };

    log('Sending request to:', url);
    log('Request payload:', payload);

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    log('Response status:', res.status, 'ok:', res.ok);

    // 🔥 If AI limit exceeded (from backend)
    if (res.status === 429) {
      let data;
      try {
        data = await res.json();
      } catch {
        data = { message: 'AI limit exceeded.' };
      }

      log('AI limit exceeded response:', data);
      return {
        error: 'AI_LIMIT_EXCEEDED',
        message: data.message || 'AI limit exceeded. Please try again later.',
      };
    }

    if (!res.ok) {
      const errorText = await res.text().catch(() => '(failed to read body)');
      log('Non-OK response body:', errorText);
      throw new Error(`Failed to classify. Status: ${res.status}`);
    }

    let data;
    try {
      data = await res.json();
    } catch (e) {
      log('Failed to parse JSON from /api/classify:', e);
      throw new Error('Invalid JSON from /api/classify');
    }

    log('Parsed JSON from /api/classify:', data);

    const category = data?.category || 'Unknown';
    log('Final category returned to app:', category);

    return category;
  } catch (err) {
    console.error('[aiService] classifyNeed error:', err);
    return 'Unknown';
  }
}

// -------------------------------
// GENERATE ACTION PLAN
// -------------------------------
export async function generateActionPlan(userNeed, benefit) {
  log('generateActionPlan called with:', { userNeed, benefit });

  try {
    const url = `${API_BASE_URL}/api/plan`;
    const payload = { userNeed, benefit };

    log('Sending request to:', url);
    log('Request payload:', payload);

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    log('Response status:', res.status, 'ok:', res.ok);

    // 🔥 AI limit exceeded
    if (res.status === 429) {
      let data;
      try {
        data = await res.json();
      } catch {
        data = { message: 'AI limit exceeded.' };
      }

      log('AI limit exceeded response from /api/plan:', data);

      return {
        error: 'AI_LIMIT_EXCEEDED',
        message: data.message || 'AI limit exceeded. Please try again later.',
      };
    }

    if (!res.ok) {
      const errorText = await res.text().catch(() => '(failed to read body)');
      log('Non-OK response from /api/plan:', errorText);
      throw new Error(`Failed to generate plan. Status: ${res.status}`);
    }

    let data;
    try {
      data = await res.json();
    } catch (e) {
      log('Failed to parse JSON from /api/plan:', e);
      throw new Error('Invalid JSON from /api/plan');
    }

    log('Parsed JSON from /api/plan:', data);

    const steps = Array.isArray(data?.steps) ? data.steps : [];
    log('Final steps returned to app:', steps);

    return steps;
  } catch (err) {
    console.error('[aiService] generateActionPlan error:', err);

    return [
      'Sorry, something went wrong while generating the plan.',
      'Check backend logs for details.',
      'Please try again later.',
    ];
  }
}
