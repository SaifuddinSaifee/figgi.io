import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeadingProps {
	title: string;
	description: string;
	icon: LucideIcon;
}

const Heading = ({ title, description, icon: Icon }: HeadingProps) => {
	return (
		<div className="text-4xl mb-8 space-y-4 pl-16 flex justify-center items-center gap-x-6">
				<Icon className="text-black w-24 h-24" />
			<div className="flex items-start flex-col">
				<h1>{title}</h1>
				<p className="text-xl font-thin">{description}</p>
			</div>
		</div>
	);
};

export default Heading;
