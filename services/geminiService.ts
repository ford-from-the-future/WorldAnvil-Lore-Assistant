
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available from environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey });

/**
 * Gets a response from the Gemini AI based on provided context and a user question.
 * @param context - A string (likely JSON) of World Anvil data.
 * @param question - The user's question.
 * @returns The AI's textual response.
 */
export const getAiResponse = async (context: string, question: string): Promise<string> => {
  const model = "gemini-2.5-flash";

  const systemInstruction = `You are a helpful assistant and lore master for a world created in World Anvil. Your knowledge is strictly limited to the information provided in the "CONTEXT" section below. Do not use any external knowledge or make up information. If the answer is not in the context, state that you cannot find that information within the provided lore. Answer in a clear and helpful manner, as if you are a scholar of this specific world.`;

  const fullPrompt = `CONTEXT:\n---\n${context}\n---\n\nQUESTION:\n${question}`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: fullPrompt,
      config: {
        systemInstruction,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get a response from the AI. Please check the console for details.");
  }
};
