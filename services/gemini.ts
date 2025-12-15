import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are an expert Roblox Lua scripter (Luau). 
Your task is to generate robust, optimized, and clearly commented Lua scripts for Roblox based on user prompts.

Rules:
1. Output ONLY the raw Lua code. Do not wrap it in markdown code blocks (e.g., no \`\`\`lua).
2. Include comments explaining complex parts of the logic.
3. Use Roblox best practices (e.g., Connect signals properly, use task.wait() instead of wait(), use local variables).
4. If the script requires a specific setup (e.g., needs to be in ServerScriptService, or needs a Part named "Trap"), mention it in a comment at the very top.
5. Handle errors gracefully where applicable.
6. If the user asks for something dangerous or against TOS, decline politely in a comment.
`;

export const generateRobloxScript = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // Using pro model for better coding logic
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2, // Low temperature for precise code
      },
    });

    let text = response.text || "-- No code generated.";
    
    // Clean up potential markdown formatting if the model disregards instructions
    text = text.replace(/^```lua\s*/, '').replace(/^```\s*/, '').replace(/```$/, '');

    return text;
  } catch (error) {
    console.error("Gemini generation error:", error);
    throw new Error("Failed to generate script. Please try again.");
  }
};