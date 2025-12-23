
import { GoogleGenAI } from "@google/genai";

/**
 * Robust API Key recovery.
 * Uses typeof check to avoid "process is not defined" ReferenceErrors.
 */
const getApiKey = (): string => {
  try {
    // Check window.process first (our shim)
    if (typeof window !== 'undefined' && (window as any).process?.env?.API_KEY) {
      return (window as any).process.env.API_KEY;
    }
    // Check global process (Netlify/Node environment)
    if (typeof process !== 'undefined' && process.env?.API_KEY) {
      return process.env.API_KEY;
    }
  } catch (e) {
    console.warn("Fuji Sensei AI: Error accessing process.env", e);
  }
  return '';
};

const apiKey = getApiKey();

export const generateAIResponse = async (prompt: string): Promise<string> => {
  // If no API key, fail gracefully instead of crashing the whole app
  if (!apiKey) {
    return "Konnichiwa! I'm currently in 'Zen mode' (offline). Please reach out to our staff via the Contact form for immediate help! 🌸";
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: `You are 'Fuji Sensei', the official AI assistant for FUJI JAPANESE INSTITUTE.
        Location: Electronic City, Bengaluru.
        Courses: JLPT N5 to N1, Spoken Japanese, Corporate Training.
        Tone: Polite (Desu/Masu style), encouraging, and helpful.
        Limit: 80 words. Use Japanese emojis like 🌸, ⛩️, 🍡.`,
      }
    });
    
    return response.text || "Sumimasen! I couldn't process that. Could you try asking in a different way? 🎏";
  } catch (error) {
    console.error("Fuji Sensei API Error:", error);
    return "Sumimasen! I am taking a short tea break. Please try again in a moment! 🍵";
  }
};
