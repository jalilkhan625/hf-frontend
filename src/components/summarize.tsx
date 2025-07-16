export const summarizeText = async (text: string): Promise<string> => {
  const response = await fetch("https://hf-backend-7t0n.onrender.com/api/summarize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Backend API error:", error);
    throw new Error("❌ Failed to summarize text.");
  }

  const data = await response.json();
  if (data.summary) {
    return data.summary;
  }

  throw new Error("Invalid response from backend.");
};
