import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Navbar({ toggleSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        Swal.fire("Logged Out", "You have been logged out", "success");
        navigate("/");
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  };

  return (
    <div className="h-14 bg-white shadow flex justify-between px-4 md:px-6 items-center sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {/* Hamburger Icon - Sirf Mobile par dikhega (md:hidden) */}
        <button 
          onClick={toggleSidebar} 
          className="md:hidden p-2 text-blue-600 hover:bg-gray-100 rounded-lg text-2xl focus:outline-none"
        >
          ☰
        </button>
        <h1 className="font-bold text-blue-600 text-lg md:text-xl">
          Complaint Portal
        </h1>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg hover:bg-red-600 transition text-sm font-medium"
      >
        Logout
      </button>
    </div>
  );
}
