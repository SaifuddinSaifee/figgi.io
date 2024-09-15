"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, BotIcon, Code2Icon, ImageIcon, Music2Icon, VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
    {
		label: "QA Bot",
		icon: BotIcon,
		href: "/conversation",
	},
    {
		label: "Image Generation",
		icon: ImageIcon,
		href: "/image",
	},
    {
		label: "Video Generation",
		icon: VideoIcon,
		href: "/video",
	},
    {
		label: "Music Generation",
		icon: Music2Icon,
		href: "/music",
	},
    {
		label: "Code Generation",
		icon: Code2Icon,
		href: "/code",
	},

]

const DashboardPage = () => {

    const router = useRouter()

	return (
		<div>
			<div className="mb-8 space-y-4 pl-16">
				<h2 className="text-4xl md:text-3xl">Hello There👋</h2>
			</div>

            <div className="px-16 md:px:20 lg:px-32 space-y-4">
                {tools.map((tool) => (
                    <Card
                        onClick={() => router.push(tool.href)}
                        key={tool.href}
                        className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
                    >
                        <div className="flex items-center gap-x-6">
                            <tool.icon className={cn(tool.icon, "text-black w-8 h-8")}/>
                            <div>
                                <span className="text-xl">{tool.label}</span>
                                {/* Add more description about the tool later */}
                            </div>
                        </div>
                        <ArrowRight className="text-black w-7 h-7" />
                    </Card>
                ))}
            </div>

		</div>
	);
}

export default DashboardPage