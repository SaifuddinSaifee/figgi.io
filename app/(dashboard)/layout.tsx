import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="dashboard-layout h-full relative">
			<div className="hidden h-full md:flex w-72 md:flex-col md:fixed md:inset-y-0 z-[80]">
				<Sidebar />
			</div>
			<div className="main-content md:pl-72">
				<Navbar />
				{children}
			</div>
		</div>
	);
};

export default DashboardLayout;
