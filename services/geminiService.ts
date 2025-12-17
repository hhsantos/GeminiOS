
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Fix: Initializing Gemini with API key directly from process.env.API_KEY per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGeminiResponse = async (prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: "You are GeminiOS Assistant, an AI built directly into the GeminiOS desktop environment. You help users with technical tasks, explain features of the OS, and provide general assistance. Be concise and friendly.",
      }
    });

    const result = await chat.sendMessage({ message: prompt });
    return result.text || "I'm sorry, I couldn't process that.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Something went wrong. Please check your connection or try again later.";
  }
};
