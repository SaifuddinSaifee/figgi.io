"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";

const MobileSidebar = () => {
	return (
		<div className="flex items-center">
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="ghost" size="icon" className="md:hidden">
						<Menu className="w-6 h-6" />
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="p-0">
					<Sidebar />
				</SheetContent>
			</Sheet>
		</div>
	);
};

export default MobileSidebar;
