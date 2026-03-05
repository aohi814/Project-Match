import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini API client
// The API key is injected by the environment
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface SuggestionResponse {
  markdown: string;
  groundingMetadata?: any;
}

export async function generateSuggestions(
  companyName: string,
  jobDescription: string,
  resume: string
): Promise<SuggestionResponse> {
  try {
    const prompt = `
You are an expert technical recruiter and career coach. Your task is to help a candidate tailor their resume for a specific role at a specific company.

**Target Company:** ${companyName}

**Job Description:**
${jobDescription}

**Candidate's Resume:**
${resume}

**Task:**
1.  **Research ${companyName}:** Use Google Search to understand their recent engineering challenges, tech stack, core products, and company culture.
2.  **Analyze the Fit:** Compare the candidate's resume against the Job Description and the company's specific context.
3.  **Suggest Project Experiences:**
    *   Propose 3-5 specific, high-impact project experiences or resume bullet points.
    *   These should be realistic extensions of the candidate's current skills but framed to perfectly match ${companyName}'s needs.
    *   *Example:* If the company handles high-frequency trading, suggest a project about "optimizing latency in a data ingestion pipeline" rather than just "built an API."
4.  **Provide Rationale:** Explain *why* each suggestion works, citing specific details about the company or the JD.

**Output Format:**
Please provide the response in clean Markdown. Use bolding for emphasis.
Structure the response as follows:
## 🏢 Company & Role Analysis
(Brief insights about the company and the role's key demands)

## ⚖️ Gap Analysis
(What is missing or needs strengthening in the current resume)

## 🚀 Suggested Project Experiences
(The core suggestions, with "Why this works" for each)

## 💡 Tailoring Tips
(General advice on formatting or keywords to include)
`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    return {
      markdown: response.text || "No response generated.",
      groundingMetadata: response.candidates?.[0]?.groundingMetadata,
    };
  } catch (error) {
    console.error("Error generating suggestions:", error);
    throw new Error("Failed to generate suggestions. Please try again.");
  }
}
