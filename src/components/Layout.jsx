import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 flex flex-col">
      {/* Navbar ko toggle function pass karein */}
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar ko state pass karein */}
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content: Mobile par padding kam (p-4) rakhein */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
