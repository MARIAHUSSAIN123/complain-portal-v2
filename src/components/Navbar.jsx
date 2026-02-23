import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Navbar({ toggleSidebar }) {
  // ... handleLogout function wahi rehne dein

  return (
    <div className="h-16 bg-white shadow-md flex justify-between px-4 items-center sticky top-0 z-50">
      <div className="flex items-center gap-3">
        {/* Hamburger Button with explicit styling for mobile touch */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleSidebar();
          }}
          className="md:hidden p-2 text-blue-600 hover:bg-gray-100 rounded-lg text-3xl cursor-pointer active:scale-95 transition-all"
          aria-label="Toggle Menu"
        >
          ☰
        </button>
        <h1 className="font-bold text-blue-600 text-lg">Complaint Portal</h1>
      </div>

      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold">
        Logout
      </button>
    </div>
  );
}
