import { GoogleGenAI } from "@google/genai";

// We initialize the GoogleGenAI client here.
// In a real application with user API keys, this would be handled via a secure backend
// or populated dynamically based on the signed-in user's config.
export const ai = process.env.GEMINI_API_KEY 
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;

// Helper to generate text quickly
export async function generateAIText(prompt: string, systemInstruction?: string): Promise<string> {
  if (!ai) throw new Error("GEMINI_API_KEY is not configured.");
  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: systemInstruction ? { systemInstruction } : undefined
  });
  
  return response.text?.trim() || "";
}
