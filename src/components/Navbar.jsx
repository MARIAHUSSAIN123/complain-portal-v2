import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Menu } from "lucide-react"; // Agar lucide-react nahi hai toh simple "☰" use karein

export default function Navbar({ toggleSidebar }) { // 👈 toggleSidebar prop liya
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
    <div className="h-14 bg-white shadow flex justify-between px-6 items-center sticky top-0 z-30">
      
      <div className="flex items-center gap-4">
        {/* Hamburger Menu Button - Sirf Mobile par dikhega */}
        <button 
          onClick={toggleSidebar} 
          className="md:hidden p-1 text-gray-600 hover:bg-gray-100 rounded"
        >
          <Menu size={24} /> 
          {/* Agar Icon nahi chal raha toh yahan ☰ likh dein */}
        </button>

        <h1 className="font-bold text-blue-600 text-lg md:text-xl">
          Complaint Portal
        </h1>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition text-sm font-medium"
      >
        Logout
      </button>
    </div>
  );
}
