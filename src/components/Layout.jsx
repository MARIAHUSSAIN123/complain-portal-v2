import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600">

      {/* Navbar */}
      <Navbar />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Scroll Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          {children}
        </div>

      </div>

    </div>
  );
}
