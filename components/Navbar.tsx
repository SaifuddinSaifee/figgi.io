// components/Navbar.tsx
import React from "react";
import MobileSidebar from "@/components/mobile-sidebar";

function Navbar() {
  return (
    <div className="flex items-center">
      <MobileSidebar /> {/* Only visible on mobile due to md:hidden in MobileSidebar */}
    </div>
  );
}

export default Navbar;
