import { GoogleGenerativeAI } from "@google/generative-ai";
import { Message } from "ai";

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

// Function to check if the question is math-related
function isMathRelated(question: string): boolean {
  const mathKeywords = [
    'math', 'mathematics', 'algebra', 'geometry', 'calculus',
    'equation', 'number', 'addition', 'subtraction', 'multiplication',
    'division', 'fraction', 'decimal', 'percentage', 'sum',
    'difference', 'product', 'quotient', 'triangle', 'circle',
    'square', 'rectangle', '+', '-', '*', '/', '=', '>', '<',
    'solve', 'calculate', 'arithmetic', 'probability', 'statistics'
  ];

  const questionLower = question.toLowerCase();
  return mathKeywords.some(keyword => questionLower.includes(keyword));
}

export async function POST(req: Request) {
  const reqBody = await req.json();
  const messages: Message[] = reqBody.messages;

  // Get the latest user message
  const latestUserMessage = messages.filter(msg => msg.role === 'user').pop();

  if (!latestUserMessage) {
    return new Response(JSON.stringify({ error: 'No user message found' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Check if the question is math-related
  if (!isMathRelated(latestUserMessage.content)) {
    return new Response(
      'I can only help you with math-related questions. Please ask me about mathematics, calculations, or similar topics.',
      {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      }
    );
  }

  // Add a math-focused system prompt
  const mathSystemPrompt: Message = {
    id: crypto.randomUUID(),
    role: 'system',
    content: 'You are a math tutor assistant. Only provide responses related to mathematics and mathematical concepts. Keep explanations clear and suitable for children. Respond with the same language as the user. French is preferred.',
  };

  // Build the multi-turn chat prompt
  const modelName = "gemini-2.0-flash";
  const promptWithParts = buildGoogleGenAIPrompt([mathSystemPrompt, ...messages]);

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
  const model = genAI.getGenerativeModel({
    model: modelName,
  });

  console.log("MODELNAME: " + modelName);
  console.log("PROMPT WITH PARTS: ");
  console.log(promptWithParts);

  const result = await model.generateContentStream(promptWithParts);
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of result.stream) {
        const text = chunk.text();
        if (text) {
          controller.enqueue(new TextEncoder().encode(text));
        }
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}

function buildGoogleGenAIPrompt(messages: Message[]) {
  return {
    contents: messages
      .filter(
        (message) => message.role === "user" || message.role === "assistant" || message.role === "system"
      )
      .map((message) => ({
        role: message.role === "user" ? "user" : "model",
        parts: [{ text: message.content }],
      })),
  };
}
