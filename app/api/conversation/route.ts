import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize the OpenAI client
const openai = new OpenAI({
    baseURL: 'http://localhost:11434/v1',
    apiKey: 'ollama', // required but unused
  })

export async function POST(request: Request) {
    try {
        // Get the authenticated user
        const { userId } = auth();

        // Parse the request body
        const body = await request.json();
        const { messages } = body;

        // Check for missing values
        if (!userId) {
            return new Response("Unauthorized", { status: 401 });
        }
        if (!messages || !Array.isArray(messages)) {
            return new Response("Please enter a valid message", { status: 400 });
        }

        // Call the OpenAI API for message completion
        const completion = await openai.chat.completions.create({
            model: "qwen2.5:3b", // Make sure the model name is correct
            messages: messages,
        });

        // Extract the content from the response
        const completionMessage = completion.choices[0]?.message;

        // Return the completion result
        return NextResponse.json(completionMessage);
    } catch (error) {
        console.error("[CONVERSATION_ERROR]", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
