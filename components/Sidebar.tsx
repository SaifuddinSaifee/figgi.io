"use client";

import { cn } from "@/lib/utils";
import { BotIcon, Code2Icon, ImageIcon, LayoutDashboard, Music2Icon, Settings2Icon, VideoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "/assets/logo.png";
import { UserButton } from "@clerk/nextjs";

const routes = [
	{
		label: "Dashboard",
		icon: LayoutDashboard,
		href: "/dashboard",
		color: "text-white",
	},
    {
		label: "QA Bot",
		icon: BotIcon,
		href: "/conversation",
		color: "text-white",
	},
    {
		label: "Image Generation",
		icon: ImageIcon,
		href: "/image",
		color: "text-white",
	},
    {
		label: "Video Generation",
		icon: VideoIcon,
		href: "/video",
		color: "text-white",
	},
    {
		label: "Music Generation",
		icon: Music2Icon,
		href: "/music",
		color: "text-white",
	},
    {
		label: "Code Generation",
		icon: Code2Icon,
		href: "/code",
		color: "text-white",
	},
    {
		label: "Settings",
		icon: Settings2Icon,
		href: "/settings",
		color: "text-white",
	},
];

const Sidebar = () => {

    const pathName = usePathname();

	return (
		<div className="sidebar space-y-4 py-1 flex flex-col h-full bg-black text-white">
			<div className="px-3 py-2 flex-1">
				<Link href="/dashboard" className="flex justify-center mb-14">
					<div className="relative w-20 h-20 flex justify-center items-center">
						<Image fill src={logo} alt="Figgi Logo" />
					</div>
				</Link>

				<div className="flex w-full m-4">
				<UserButton afterSwitchSessionUrl="/" />
			</div>
            
				<div className="space-y-1 flex justify-center items-center flex-col">
					{routes.map((route) => (
						<Link
							href={route.href}
							key={route.label}
							className={cn("flex items-center justify-items-start p-5 hover:bg-gray-800 w-11/12 cursor-pointer rounded-xl", pathName === route.href ? "bg-gray-800" : "")}
						>
							<route.icon className={cn(route.color, "w-6 h-6 mr-4")} />{" "}
							<div className="">
                                <p className="text-lg">{route.label}</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
