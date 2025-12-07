# PLUM_ASSIGNMENT

📘 AI-Powered Benefits Discovery Flow – README

1. Project Setup & Demo

    Backend (Node.js + Express + Gemini AI)
    cd backend
    npm install
    npm start


    Create a .env file inside backend/:

    GEMINI_API_KEY=your_api_key_here
    PORT=5000

    Frontend (React + Vite + Zustand + Axios + Tailwind)
    cd frontend
    npm install
    npm run dev


    Create a .env inside frontend/:

    VITE_API_BASE_URL=http://localhost:5000

    Live Deployment Links

    Frontend (Vercel):https://plum-assignment-nu.vercel.app/
    Backend (Render):https://plum-assignment-1.onrender.com

2. Problem Understanding

    Goal: Build a multi-screen experience where an employee:

    Describes a health-related problem in free text

    AI classifies it into one of the categories: Dental, Mental Health, Vision, OPD

    User sees matching benefits

    User selects a benefit → AI generates a 3-step action plan

    Key requirements:

    AI must return only the category (strict output)

    Action plan must have exactly 3 steps, numbered 1., 2., 3.

    Show fallback messages when input is unclear

    Provide regenerate + pick another benefit options

    This implementation fully matches the required screens and flow.

3. AI Prompts & Iterations

    Initial Classification Prompt (discarded)

    The initial prompt returned long explanations instead of a single word.

    Final Classification Prompt (used in production)
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
    "{userNeed}"

    Action Plan Prompt
    Write a 3-step action plan for using this employee benefit.

    Rules:
    - MUST be numbered exactly: 1., 2., 3.
    - Keep steps short.
    - No extra text.

    AI Limit Handling

    If Gemini returns a 429 RESOURCE_EXHAUSTED error, the frontend displays:

    “AI limit has been exceeded. Please try again later.”

4. Architecture & Code Structure

    Backend Structure
    backend/
    ├── config/
    │    └── geminiClient.js
    ├── controllers/
    │    └── aiController.js
    ├── routes/
    │    └── aiRoutes.js
    ├── middleware/
    │    └── errorHandler.js
    ├── server.js / app.js
    └── package.json

    Frontend Structure
    frontend/
    ├── src/
    │    ├── components/
    │    │    ├── BenefitInput.jsx
    │    │    ├── BenefitList.jsx
    │    │    ├── BenefitDetails.jsx
    │    │    └── LoadingScreen.jsx
    │    ├── store/
    │    │    └── useBenefitsStore.js
    │    ├── services/
    │    │    ├── apiClient.js
    │    │    └── aiService.js
    │    ├── mock/
    │    │    └── benefits.js
    │    ├── App.jsx
    │    └── main.jsx
    └── package.json

    State Management

    Zustand manages:

    step

    userNeed

    category

    selectedBenefit

    actionPlan

    loading & error state

    AI limit handling

    Navigation

    All navigation inside the app is step-based to match the required multi-screen flow.

5. Screenshots / Screen Recording

    Add:

    Screen 1 – Input problem (https://github.com/1NFINITYY/PLUM_ASSIGNMENT/blob/main/assets/image.png)

    Screen 2 – AI Classification Loading
   (https://github.com/1NFINITYY/PLUM_ASSIGNMENT/blob/main/assets/Screenshot%202025-12-07%20150701.png)

    Screen 3 – Benefit Selection (https://github.com/1NFINITYY/PLUM_ASSIGNMENT/blob/main/assets/Screenshot%202025-12-07%20150738.png)

    Screen 4 – Action Plan
   (https://github.com/1NFINITYY/PLUM_ASSIGNMENT/blob/main/assets/Screenshot%202025-12-07%20150748.png)

7. Known Issues & Improvements

    Known Issues

    AI may misclassify vague inputs

    Gemini free-tier quota gets exhausted quickly

    Action plan may not perfectly match formatting in rare cases

    Improvements

    Ask clarifying questions for vague descriptions

    Add filtering or search to benefits list

    Add multi-language support

    Option to switch AI provider (e.g., OpenAI, Claude)

    Better analytics (user flow, drop-off rates)

8. Bonus Work

    The following features were implemented beyond basic requirements:

    Tailwind-based polished dark UI

    “Regenerate Plan” button

    “Pick Another Benefit” feature

    Fully deployed MERN + AI app (Render backend + Vercel frontend)

    Axios HTTP client with central configuration

    Robust error handling including AI quota exceeded responses

Final Notes

    This project delivers a complete AI-driven benefits discovery flow using:

    Gemini API

    Express backend

    React frontend with Zustand

    Fully deployed and cloud-ready architecture
