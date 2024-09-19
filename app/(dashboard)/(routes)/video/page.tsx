"use client";

import { VideoIcon } from "lucide-react";


import Heading from "@/components/heading";

const Conversation = () => {

	return (
		<div>
			<Heading
				title="Video Generation"
				description="AI powered video generator"
				icon={VideoIcon}
				iconColor="text-violet-500"
			/>

			<h2 className="text-4xl md:text-3xl text-center italic">Coming Soon</h2>
		</div>
	);
};

export default Conversation;
