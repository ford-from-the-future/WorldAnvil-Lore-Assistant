// services/geminiService.ts
// Client-side Gemini service that calls your server endpoint safely.

export async function getAiResponse(context: string, question: string): Promise<string> {
  try {
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ context, question }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText || "AI request failed");
    }

    const data = await response.json();
    return data.text || "";
  } catch (err) {
    console.error("Error calling AI endpoint:", err);
    throw err;
  }
}
// This service abstracts the API call and error handling for easier use in your components.