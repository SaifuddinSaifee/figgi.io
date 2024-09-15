import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";


export default function LandingPage() {
	return (
		<div>
			<h1>Landing Page (Unprotected)</h1>
			<Link href="/sign-in">
				<Button variant="outline">Sign In</Button>
			</Link>
      <Link href="/sign-up">
				<Button variant="outline">Register</Button>
			</Link>
		</div>
	);
}
