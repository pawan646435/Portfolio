// app/api/chat/route.ts
//
// Streaming chat endpoint backed by Groq, using the Vercel AI SDK so the
// frontend can drive it with the `useChat` hook (from @ai-sdk/react)
// with minimal extra plumbing.
//
// Env var (add to .env.local and your Vercel project settings):
//   GROQ_API_KEY=your_key_here

import { groq } from "@ai-sdk/groq";
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { SYSTEM_PROMPT } from "@/lib/portfolio-knowledge";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  // Cap history sent to the model so a long back-and-forth doesn't blow
  // up token usage — the knowledge base is small, so this is generous.
  const trimmedMessages = messages.slice(-12);

  const result = streamText({
    model: groq("llama-3.3-70b-versatile"),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(trimmedMessages),
    temperature: 0.4,
    maxOutputTokens: 400,
  });

  return result.toUIMessageStreamResponse();
}
