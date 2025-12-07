// src/services/aiService.js
import api from "./apiClient";

// -------------------------------
// CLASSIFY NEED
// -------------------------------
export async function classifyNeed(userNeed) {
  try {
    const response = await api.post("/api/classify", { userNeed });

    return response.data?.category || "Unknown";
  } catch (err) {
    const status = err?.response?.status;
    const data = err?.response?.data;

    if (status === 429) {
      return {
        error: "AI_LIMIT_EXCEEDED",
        message: data?.message || "AI limit exceeded. Please try again later.",
      };
    }

    return "Unknown";
  }
}

// -------------------------------
// GENERATE ACTION PLAN
// -------------------------------
export async function generateActionPlan(userNeed, benefit) {
  try {
    const response = await api.post("/api/plan", { userNeed, benefit });

    return Array.isArray(response.data?.steps)
      ? response.data.steps
      : [];
  } catch (err) {
    const status = err?.response?.status;
    const data = err?.response?.data;

    if (status === 429) {
      return {
        error: "AI_LIMIT_EXCEEDED",
        message: data?.message || "AI limit exceeded. Please try again later.",
      };
    }

    return [
      "Sorry, something went wrong while generating the plan.",
      "Please try again later.",
    ];
  }
}
