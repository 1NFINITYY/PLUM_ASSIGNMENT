// backend/config/geminiClient.js
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error('❌ ERROR: GEMINI_API_KEY missing in .env');
  process.exit(1);
}

const client = new GoogleGenAI({ apiKey });

export async function callGemini(prompt) {
  const response = await client.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
  });

  const text =
    response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';

  return text;
}
