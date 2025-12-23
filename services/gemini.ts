
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // Ensure this is set in your environment
const ai = new GoogleGenAI({ apiKey });

export const generateAIResponse = async (prompt: string): Promise<string> => {
  if (!apiKey) {
    return "I'm sorry, my connection to the server is currently unavailable. Please try again later.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: `You are 'Fuji Sensei', a polite, encouraging, and knowledgeable AI assistant for the FUJI JAPANESE INSTITUTE website.
        
        Your primary goals:
        1. Answer questions about Japanese language (translations, grammar, vocabulary).
        2. Provide information about FUJI JAPANESE INSTITUTE's courses (N5-N1, Spoken Japanese).
        3. Explain Japanese culture and etiquette.
        4. Be concise, friendly, and use Japanese emojis where appropriate (e.g., 🌸, 🎎).
        
        If asked about course prices or specific schedules not in your knowledge, politely suggest they visit the 'Courses' page or use the 'Contact Us' form.
        
        Keep responses under 100 words unless asked for a detailed explanation.
        `,
      }
    });
    
    return response.text || "Sumimasen! I couldn't understand that completely. Could you rephrase?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sumimasen! I am experiencing some technical difficulties. Please try again later.";
  }
};
