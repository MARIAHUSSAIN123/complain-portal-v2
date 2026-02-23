import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  // Sidebar toggle karne ka function
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 flex flex-col">
      {/* Navbar ko function pass kar dia */}
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 relative overflow-hidden">
        {/* Sidebar ko state aur function pass kar dia */}
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content Area: Mobile par p-4, Desktop par p-8 */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}
