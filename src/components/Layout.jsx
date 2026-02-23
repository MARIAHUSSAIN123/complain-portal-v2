import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 min-h-screen w-full">

      <Navbar />

      <div className="flex flex-col md:flex-row w-full">

        <Sidebar />

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
}
