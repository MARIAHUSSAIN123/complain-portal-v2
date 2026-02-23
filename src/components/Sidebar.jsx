import { Link } from "react-router-dom";

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <>
      {/* Overlay: Jab mobile par sidebar khulay toh peeche wali screen dark ho jaye */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 md:hidden" 
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar Main Div */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-white/20 backdrop-blur-xl min-h-screen text-white shadow-xl transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="p-6 text-2xl font-bold border-b border-white/30 flex justify-between items-center">
          <span>Menu</span>
          {/* Mobile par Close Button */}
          <button onClick={toggleSidebar} className="md:hidden text-white text-xl">✕</button>
        </div>

        <nav className="p-6 space-y-4 font-medium">
          <Link to="/dashboard" onClick={() => { if(window.innerWidth < 768) toggleSidebar() }} className="block hover:bg-white/30 p-3 rounded-xl transition">
            Dashboard
          </Link>
          <Link to="/mycomplain" onClick={() => { if(window.innerWidth < 768) toggleSidebar() }} className="block hover:bg-white/30 p-3 rounded-xl transition">
            My Complaint
          </Link>
          <Link to="/complain" onClick={() => { if(window.innerWidth < 768) toggleSidebar() }} className="block hover:bg-white/30 p-3 rounded-xl transition">
            New Complaint
          </Link>
          <Link to="/admin" onClick={() => { if(window.innerWidth < 768) toggleSidebar() }} className="block hover:bg-white/30 p-3 rounded-xl transition">
            Admin
          </Link>
        </nav>
      </div>
    </>
  );
}
