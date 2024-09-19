"use client";

import { Music2Icon } from "lucide-react";


import Heading from "@/components/heading";

const Conversation = () => {

	return (
		<div>
			<Heading
				title="Music Generation"
				description="AI powered music generator"
				icon={Music2Icon}
				iconColor="text-violet-500"
			/>

			<h2 className="text-4xl md:text-3xl text-center italic">Coming Soon</h2>
		</div>
	);
};

export default Conversation;
