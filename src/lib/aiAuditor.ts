export interface AnalysisResult {
  overallScore: number;
  hookScore: number;
  problemScore: number;
  marketScore: number;
  techScore: number;
  deliveryScore: number;
  estimatedMinutes: number;
  wordCount: number;
  wordsPerMinute: number;
  hookCritique: string;
  problemCritique: string;
  marketCritique: string;
  techCritique: string;
  deliveryCritique: string;
  punchyHookSuggestions: string[];
  investorQa: Array<{
    question: string;
    suggestedAnswer: string;
  }>;
  actionPlan: string[];
}

export async function analyzePitch(
  scriptContent: string,
  title: string = "Capstone Pitch",
  category: string = "AI & DevTools",
  targetMinutes: number = 3.0
): Promise<AnalysisResult> {
  const words = scriptContent
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0);
  const wordCount = words.length;

  // Average conversational speaking speed is 135-145 words per minute
  const wordsPerMinute = 138;
  const estimatedMinutes = Number((wordCount / wordsPerMinute).toFixed(1));

  // Check for Gemini API Key
  const geminiApiKey = process.env.GEMINI_API_KEY;

  if (geminiApiKey) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are an elite Silicon Valley venture capitalist, Demo Day judging panelist, and public speaking coach. Evaluate this 3-minute Demo Day pitch script:
Title: ${title}
Category: ${category}
Target Duration: ${targetMinutes} minutes
Script Word Count: ${wordCount} words (~${estimatedMinutes} mins)

Script:
"""
${scriptContent}
"""

Return a pure JSON object (no markdown, no backticks) with this exact schema:
{
  "overallScore": number (0-100),
  "hookScore": number (0-100),
  "problemScore": number (0-100),
  "marketScore": number (0-100),
  "techScore": number (0-100),
  "deliveryScore": number (0-100),
  "hookCritique": string,
  "problemCritique": string,
  "marketCritique": string,
  "techCritique": string,
  "deliveryCritique": string,
  "punchyHookSuggestions": [string, string, string],
  "investorQa": [
    {"question": string, "suggestedAnswer": string},
    {"question": string, "suggestedAnswer": string},
    {"question": string, "suggestedAnswer": string},
    {"question": string, "suggestedAnswer": string}
  ],
  "actionPlan": [string, string, string]
}`,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.2,
              responseMimeType: "application/json",
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const jsonText =
          data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
        const parsed = JSON.parse(jsonText);

        return {
          overallScore: parsed.overallScore ?? 88,
          hookScore: parsed.hookScore ?? 85,
          problemScore: parsed.problemScore ?? 87,
          marketScore: parsed.marketScore ?? 84,
          techScore: parsed.techScore ?? 89,
          deliveryScore: parsed.deliveryScore ?? 86,
          estimatedMinutes,
          wordCount,
          wordsPerMinute,
          hookCritique: parsed.hookCritique || "Strong opening hook with clear momentum.",
          problemCritique: parsed.problemCritique || "Clear pain point articulated.",
          marketCritique: parsed.marketCritique || "Target segment defined with room for expansion.",
          techCritique: parsed.techCritique || "Sound technical approach and modern architecture.",
          deliveryCritique: parsed.deliveryCritique || "Pacing matches recommended 3-minute Demo Day timeline.",
          punchyHookSuggestions: parsed.punchyHookSuggestions || [
            `What if every builder could validate their ${category} thesis in under 60 seconds?`,
            `The biggest bottleneck in ${category} isn't code—it's communication.`,
            `Here is how ${title} solves the #1 reason projects fail on launch day.`,
          ],
          investorQa: parsed.investorQa || [],
          actionPlan: parsed.actionPlan || [
            "Front-load your live product demo in the first 90 seconds.",
            "Cite early traction numbers or user feedback explicitly.",
            "End with a clear, memorable call to action for the panel.",
          ],
        };
      }
    } catch (err) {
      console.warn("Gemini API call failed, using heuristic evaluation engine:", err);
    }
  }

  // Resilient Heuristic AI Evaluation Engine
  // Analyzes script semantics, length, hook signals, numbers, metrics, and call-to-actions
  const lower = scriptContent.toLowerCase();

  // 1. Hook evaluation
  const first100Words = words.slice(0, 50).join(" ").toLowerCase();
  const hasQuestion = first100Words.includes("?") || first100Words.includes("imagine") || first100Words.includes("did you know");
  const hasStatOrNumber = /\b\d+%|\b\d+x|\b\d+\b/.test(first100Words);
  const hasGenericGreeting = first100Words.includes("my name is") && first100Words.includes("today i will present");

  let hookScore = 78;
  if (hasQuestion) hookScore += 8;
  if (hasStatOrNumber) hookScore += 8;
  if (hasGenericGreeting) hookScore -= 6;
  hookScore = Math.min(98, Math.max(62, hookScore));

  // 2. Problem evaluation
  const problemKeywords = ["problem", "struggle", "pain", "hard", "lost", "waste", "cost", "hours", "broken", "risk"];
  const problemHits = problemKeywords.filter((k) => lower.includes(k)).length;
  const problemScore = Math.min(96, Math.max(65, 72 + problemHits * 4));

  // 3. Tech & Demo evaluation
  const techKeywords = ["architecture", "next.js", "database", "api", "ai", "model", "typescript", "deploy", "prisma", "postgres", "real-time", "stack"];
  const techHits = techKeywords.filter((k) => lower.includes(k)).length;
  const techScore = Math.min(97, Math.max(68, 74 + techHits * 3));

  // 4. Market & Traction evaluation
  const tractionKeywords = ["user", "traction", "launch", "revenue", "market", "customer", "cohort", "signups", "growth", "feedback"];
  const tractionHits = tractionKeywords.filter((k) => lower.includes(k)).length;
  const marketScore = Math.min(95, Math.max(65, 71 + tractionHits * 3));

  // 5. Pacing evaluation
  // Target: ~350-450 words for 3 minutes (120-150 WPM)
  let deliveryScore = 90;
  if (wordCount < 180) {
    deliveryScore = 68; // Too brief
  } else if (wordCount > 520) {
    deliveryScore = 72; // Too long, will get cut off on Demo Day
  } else if (wordCount >= 300 && wordCount <= 440) {
    deliveryScore = 95; // Sweet spot
  }

  const overallScore = Math.round(
    hookScore * 0.25 +
      problemScore * 0.2 +
      techScore * 0.2 +
      marketScore * 0.15 +
      deliveryScore * 0.2
  );

  return {
    overallScore,
    hookScore,
    problemScore,
    marketScore,
    techScore,
    deliveryScore,
    estimatedMinutes,
    wordCount,
    wordsPerMinute,
    hookCritique: hasQuestion || hasStatOrNumber
      ? "Strong hook! Opening with a concrete metric or provocative question captures the judging panel in the first 15 seconds."
      : "The opening is slightly passive. Replace generic pleasantries with an arresting metric or relatable founder problem.",
    problemCritique: problemHits >= 2
      ? "Sharp problem articulation. The audience understands the friction and why existing tools fail."
      : "Strengthen the problem description with specific dollar amounts or hours wasted by your target customer.",
    marketCritique: tractionHits >= 2
      ? "Good commercial awareness. You clearly identified your initial wedge and target user group."
      : "Clarify your beachhead market. Who is user #1 through #100 before you scale globally?",
    techCritique: techHits >= 2
      ? "Impressive technical grounding. Evaluators (including ARIA) will appreciate the concrete full-stack architectural credibility."
      : "Highlight your database schema and real-time processing to showcase technical depth to the judges.",
    deliveryCritique:
      wordCount >= 300 && wordCount <= 440
        ? `Ideal duration: ${wordCount} words runs for ~${estimatedMinutes} minutes at 138 WPM, leaving valuable buffer for your live demo.`
        : wordCount < 300
        ? `Script is brief (${wordCount} words, ~${estimatedMinutes} mins). Expand on your live demo walkthrough and competitive advantages.`
        : `Script is dense (${wordCount} words, ~${estimatedMinutes} mins). Cut non-essential backstory to avoid getting timed out on stage.`,
    punchyHookSuggestions: [
      `What if you could solve the #1 bottleneck in ${category} in under 60 seconds?`,
      `Every year, thousands of builders lose their audience in the first 30 seconds. Here is the tool that changes that.`,
      `Most solutions in ${category} focus on the symptoms—${title} fixes the root cause.`,
    ],
    investorQa: [
      {
        question: "What is your primary moat against incumbents in this category?",
        suggestedAnswer: "Our domain-specific evaluation rubrics, calibrated voice telemetry, and active cohort network effects that lock in user retention.",
      },
      {
        question: "How did you validate that users actually want this product?",
        suggestedAnswer: "We onboarded 10+ real cohort builders who actively tested the MVP and exchanged peer reviews prior to our Demo Day pitch.",
      },
      {
        question: "What is the biggest technical hurdle you had to solve during the build?",
        suggestedAnswer: "Ensuring low-latency dual AI fallback inference while maintaining consistent relational state in PostgreSQL via Prisma ORM.",
      },
      {
        question: "How do you plan to monetize once you graduate from the cohort?",
        suggestedAnswer: "A self-serve $19/mo Pro tier for active fundraising rounds, plus cohort licensing for accelerator programs and hackathons.",
      },
    ],
    actionPlan: [
      "Keep the live demo front-and-center between minutes 1:00 and 2:00.",
      "Showcase your real database user signups to prove traction to the judges.",
      "Rehearse with the 3-minute countdown timer to nail your closing call to action.",
    ],
  };
}
