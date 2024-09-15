"use client";

import Heading from "@/components/heading";
import { BotIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Conversation = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: "",
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);
	};

	return (
		<div>
			<Heading
				title="QA Bot"
				description="An LLM based QA Bot"
				icon={BotIcon}
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
											className="border-none outline-none focus:border-none focus:ring-0 shadow-none"
											placeholder="Ex. How to calculate radius of a circle?"
											{...field}
											disabled={isLoading}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
                        <Button className="col-span-12 lg:col-span-2 bg-black text-white rounded-xl">
                            Generate
                        </Button>
					</form>
				</Form>
			</div>
            <div className="message-content space-y-4 mt-4 p-12">
                <h1>hi</h1>
            </div>
		</div>
	);
};

export default Conversation;
