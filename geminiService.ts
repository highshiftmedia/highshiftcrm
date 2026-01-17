import { GoogleGenAI, Type } from "@google/genai";

export const getBusinessInsights = async (context: string) => {
  try {
    // Initializing Gemini API using process.env.API_KEY directly as per guidelines.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a strategic business advisor for Highshift Media. Analyze the following CRM data summary and provide 3-4 concise, actionable insights to improve operations, profitability, or marketing efficiency. 

Data Context:
${context}`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    // Accessing the .text property from GenerateContentResponse
    return response.text || "No insights available at this moment.";
  } catch (error) {
    console.error("Error generating insights:", error);
    return "Failed to fetch AI insights. Please check your API key configuration.";
  }
};