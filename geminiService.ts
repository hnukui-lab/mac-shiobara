import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askAIArchitect = async (question: string): Promise<string> => {
  const model = "gemini-2.5-flash";
  
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: question,
      config: {
        systemInstruction: `You are an expert architectural hardware consultant for "Mac Shiobara Co., Ltd." (株式会社マックシオバラ).
        Your expertise covers:
        - Metal materials (Stainless steel SUS304/316, Aluminum, Steel, Brass).
        - Finishes (Hairline, Mirror, Baked painting, Anodizing).
        - Installation methods for handrails, panels, louvers, and facades.
        - Building regulations and safety standards in Japan.
        
        Tone: Professional, technical yet accessible, polite (Japanese Keigo).
        Answer briefly and helpfully. If asked about specific quotes, ask the user to use the Contact form.`,
      }
    });

    return response.text || "申し訳ありません。現在応答できません。";
  } catch (error) {
    console.error("AI Service Error:", error);
    return "システムエラーが発生しました。後ほど再度お試しください。";
  }
};
