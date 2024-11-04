"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { BotIcon, Send, Loader2 } from "lucide-react";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { marked } from "marked";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  prompt: z.string().min(1, { message: "Prompt is required" }),
});

const Conversation = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

// Update the onSubmit function in your Conversation component
const onSubmit = async (values: z.infer<typeof formSchema>) => {
  try {
    const userMessage: ChatCompletionMessageParam = {
      role: "user",
      content: values.prompt,
    };

    const newMessages = [...messages, userMessage];
    setMessages((current) => [...current, userMessage]);

    const response = await fetch("http://localhost:8000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: newMessages,
      }),
    });

    if (!response.ok) throw new Error('Failed to fetch response');
    
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let assistantMessage = "";

    if (!reader) throw new Error('No reader available');

    // Add an initial assistant message
    setMessages((current) => [...current, {
      role: "assistant",
      content: ""
    }]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // Decode the chunk and split into lines
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            assistantMessage += parsed.content;

            // Update the last message (assistant's message)
            setMessages((current) => {
              const updatedMessages = [...current];
              updatedMessages[updatedMessages.length - 1] = {
                role: "assistant",
                content: assistantMessage
              };
              return updatedMessages;
            });
          } catch (e) {
            console.error('Error parsing JSON:', e);
          }
        }
      }
    }

    form.reset();
  } catch (error) {
    console.error("[Conversation Error]", error);
    alert("Error communicating with LLM service");
  } finally {
    router.refresh();
  }
};

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 flex items-center space-x-2 p-2">
        <div className="bg-violet-100 p-2 rounded-lg">
          <BotIcon className="w-6 h-6 text-violet-500" />
        </div>
        <div>
          <h1 className="text-xl font-semibold p-0 m-0">Figgi Chat</h1>
          <p className="text-sm text-gray-500">Ask me anything!</p>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <BotIcon className="w-12 h-12 mb-4 text-violet-500" />
            <p className="text-lg font-medium">Welcome to Figgi Chat!</p>
            <p className="text-sm">Start a conversation by typing a message below.</p>
          </div>
        )}
        
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-2xl ${
                message.role === "user"
                  ? "bg-violet-500 text-white"
                  : "bg-white border border-gray-200"
              }`}
            >
              <div
                className="prose prose-sm"
                dangerouslySetInnerHTML={{
                  __html: marked(message.content.toString()),
                }}
              />
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 p-4 rounded-2xl flex items-center space-x-2">
              <Loader2 className="w-4 h-4 animate-spin text-violet-500" />
              <span className="text-sm text-gray-500">Figgi is thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <div className="border-t bg-white p-4 sticky bottom-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center space-x-2"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      className="border rounded-full py-6 px-4 focus:ring-2 focus:ring-violet-500"
                      placeholder="Type your message here..."
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="rounded-full p-6 bg-violet-500 hover:bg-violet-600"
            >
              <Send className="w-5 h-5 text-white" />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Conversation;