import { GoogleGenAI } from "@google/genai";

export const generateAIResponse = async (prompt: string): Promise<string> => {
  // Safe accessor for API key to prevent "process is not defined" errors in browser
  let apiKey = '';
  try {
    apiKey = process.env.API_KEY || (window as any).process?.env?.API_KEY || '';
  } catch (e) {
    apiKey = (window as any).process?.env?.API_KEY || '';
  }

  if (!apiKey) {
    console.warn("Gemini API Key missing. Fuji Assistant running in guest mode.");
    return "Konnichiwa! I'm Fuji Sensei. 🌸 I'm currently greeting guests. To inquire about specific batch timings or fees, please use the 'Apply Now' button or WhatsApp us!";
  }

  try {
    // Initialize inside the function to ensure the latest apiKey is used
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: `You are 'Fuji Sensei', a polite, encouraging, and knowledgeable AI assistant for the FUJI JAPANESE INSTITUTE website.
        
        Your primary goals:
        1. Answer questions about Japanese language (translations, grammar, vocabulary).
        2. Provide information about FUJI JAPANESE INSTITUTE's courses (N5-N1, Spoken Japanese).
        3. Explain Japanese culture and etiquette.
        4. Be concise, friendly, and use Japanese emojis where appropriate (e.g., 🌸, 🎎).
        
        If asked about course prices or specific schedules not in your knowledge, politely suggest they visit the 'Courses' page or use the 'Contact Us' form.
        
        Keep responses under 100 words.`,
      }
    });
    
    return response.text || "Sumimasen! I couldn't understand that completely. Could you rephrase? 🎏";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sumimasen! I am experiencing some technical difficulties. Please try again later. 🙏";
  }
};