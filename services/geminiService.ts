import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, Classification } from "../types";
import { SYSTEM_INSTRUCTION } from "../constants";

export const analyzeNewsText = async (text: string): Promise<AnalysisResult> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please check your environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: text,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          classification: {
            type: Type.STRING,
            enum: [Classification.REAL, Classification.FAKE, Classification.UNCERTAIN]
          },
          confidenceScore: { type: Type.NUMBER },
          summary: { type: Type.STRING },
          features: {
            type: Type.OBJECT,
            properties: {
              emotionalTone: { type: Type.NUMBER },
              sensationalism: { type: Type.NUMBER },
              factuality: { type: Type.NUMBER },
              sourceCredibility: { type: Type.NUMBER },
              biasLevel: { type: Type.NUMBER },
            },
            required: ["emotionalTone", "sensationalism", "factuality", "sourceCredibility", "biasLevel"]
          },
          keyIndicators: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          svmVectorAnalysis: { type: Type.STRING }
        },
        required: ["classification", "confidenceScore", "summary", "features", "keyIndicators", "svmVectorAnalysis"]
      }
    }
  });

  const resultText = response.text;
  if (!resultText) {
    throw new Error("Empty response from AI model.");
  }

  try {
    return JSON.parse(resultText) as AnalysisResult;
  } catch (e) {
    console.error("Failed to parse AI response", e);
    throw new Error("Invalid response format from analysis engine.");
  }
};