// backend/controllers/aiController.js
import { callGemini } from '../config/geminiClient.js';

// POST /api/classify
export async function classifyNeedController(req, res) {
  const { userNeed } = req.body;

  if (!userNeed) {
    return res.status(400).json({ error: 'userNeed required' });
  }

  const prompt = `
You are a STRICT classifier.

Return EXACTLY one of these categories:
Dental
Mental Health
Vision
OPD
Unknown

Rules:
- ONE WORD/PHRASE ONLY.
- NO explanation.
- NO sentences.

Classify this need:
"${userNeed}"
`;

  try {
    let raw;
    try {
      raw = await callGemini(prompt);
    } catch (err) {
      const message = JSON.stringify(err?.response?.data || err.message || err);

      if (message.includes('"code":429') || message.includes('RESOURCE_EXHAUSTED')) {
        return res.status(429).json({
          error: 'AI_LIMIT_EXCEEDED',
          message: 'The AI limit has been exceeded. Please try again later.',
        });
      }

      throw err;
    }

    const valid = ['Dental', 'Mental Health', 'Vision', 'OPD', 'Unknown'];
    let category = 'Unknown';

    for (const word of valid) {
      if (raw.toLowerCase().includes(word.toLowerCase())) {
        category = word;
        break;
      }
    }

    return res.json({ category });
  } catch (err) {
    return res.status(500).json({ error: 'Classification failed' });
  }
}

// POST /api/plan
export async function generatePlanController(req, res) {
  const { userNeed, benefit } = req.body;

  if (!userNeed || !benefit) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const prompt = `
Write a 3-step action plan for using this employee benefit.

Rules:
- MUST be numbered exactly: 1., 2., 3.
- Keep steps short.
- No extra text.

User Need:
${userNeed}

Benefit:
Title: ${benefit.title}
Coverage: ${benefit.coverage}
Description: ${benefit.description}
`;

  try {
    let raw;
    try {
      raw = await callGemini(prompt);
    } catch (err) {
      const message = JSON.stringify(err?.response?.data || err.message || err);

      if (message.includes('"code":429') || message.includes('RESOURCE_EXHAUSTED')) {
        return res.status(429).json({
          error: 'AI_LIMIT_EXCEEDED',
          message: 'The AI limit has been exceeded. Please try again later.',
        });
      }

      throw err;
    }

    const steps = raw
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.'))
      .slice(0, 3);

    return res.json({ steps });
  } catch (err) {
    return res.status(500).json({ error: 'Plan generation failed' });
  }
}
