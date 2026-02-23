import { Link } from "react-router-dom";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const closeSidebar = () => {
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };

  return (
    <>
      {/* Background Overlay - Mobile only */}
      <div 
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 md:hidden ${isOpen ? "opacity-100 z-40" : "opacity-0 pointer-events-none -z-10"}`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar - Higher Z-Index */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-50 w-72 bg-white/20 backdrop-blur-2xl text-white shadow-2xl transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="p-6 text-2xl font-bold border-b border-white/20 flex justify-between items-center">
          <span>Menu</span>
          <button onClick={toggleSidebar} className="md:hidden text-white p-2">✕</button>
        </div>

        <nav className="p-4 space-y-2">
          {["dashboard", "mycomplain", "complain", "admin"].map((path) => (
            <Link 
              key={path}
              to={`/${path}`} 
              onClick={closeSidebar}
              className="block hover:bg-white/20 p-4 rounded-2xl transition-all capitalize font-medium active:bg-white/40"
            >
              {path === "mycomplain" ? "My Complaints" : path === "complain" ? "New Complaint" : path}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
