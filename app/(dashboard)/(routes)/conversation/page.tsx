"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BotIcon } from "lucide-react";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { marked } from "marked";

import Heading from "@/components/heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Define the form schema
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

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const userMessage: ChatCompletionMessageParam = {
				role: "user",
				content: values.prompt,
			};

			const newMessages = [...messages, userMessage];

			const response = await axios.post("/api/conversation", {
				messages: newMessages,
			});

			setMessages((current) => [...current, userMessage, response.data]);

			form.reset();
		} catch (error) {
			console.error("[Conversation Error]", error);
			// TODO: Add error handling, e.g., display an error message to the user
		} finally {
			router.refresh();
		}
	};

	return (
		<div>
			<Heading
				title="QA Bot"
				description="An LLM based QA Bot"
				icon={BotIcon}
				iconColor="text-violet-500"
			/>

			<div className="px-4 lg:px-8">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="rounded-xl border w-full p-4 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
					>
						<FormField
							name="prompt"
							render={({ field }) => (
								<FormItem className="col-span-12 lg:col-span-10">
									<FormControl className="m-0 p-0">
										<Input
											className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent shadow-none"
											placeholder="Ex. How to calculate the radius of a circle?"
											{...field}
											disabled={isLoading}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<Button
							className="col-span-12 lg:col-span-2 w-full bg-violet-500 hover:bg-violet-600 rounded-xl text-white"
							type="submit"
							disabled={isLoading}
						>
							Generate
						</Button>
					</form>
				</Form>
			</div>

            <div style={{ display: isLoading ? "block" : "none" }} className={`rounded-xl flex justify-center items-center border border-slate-500 p-4 w-3/6 mt-6 m-auto`}>
                {<p className="text-m text-md font-bold mb-2 px-4 text-center text-slate-500">🧠 Figgi's thinking</p>}
            </div>

			<div className="space-y-4 p-12 pt-4 flex flex-col-reverse">
				{messages.map((message, index) => (
					<div
						key={index}
						className={`p-4 rounded-lg ${
							message.role === "user"
								? "bg-white border border-black/10 rounded-xl"
								: "bg-white border border-indigo-300 rounded-xl"
						}`}
					>
						<p
							className={`text-md font-bold mb-2 ${
								message.role === "user" ? "text-black" : "text-indigo-500"
							}`}
						>
							{message.role === "user" ? "You" : "Figgi"}
						</p>
						<div
							className="text-sm"
							dangerouslySetInnerHTML={{ __html: marked(message.content) }}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default Conversation;
