import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 flex flex-col overflow-x-hidden">
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 relative">
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

        {/* Is main div ka z-index kam rakhein taake sidebar upar aaye */}
        <main className="flex-1 p-4 md:p-8 w-full transition-all duration-300 z-0">
          {children}
        </main>
      </div>
    </div>
  );
}
