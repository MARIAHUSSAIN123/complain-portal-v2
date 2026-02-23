import { Link } from "react-router-dom";
import { auth, database } from "../firebase";
import { ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";

export default function Sidebar() {

  const [role, setRole] = useState(null);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const userRef = ref(database, "users/" + uid);

    onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        setRole(snapshot.val().role);
      }
    });
  }, []);

  return (
    <div className="w-full md:w-64 bg-white/20 backdrop-blur-xl text-white shadow-xl">

      <div className="p-6 text-2xl font-bold border-b border-white/30">
        Complaint Portal
      </div>

      <nav className="p-6 space-y-4">

        <Link
          to="/dashboard"
          className="block hover:bg-white/30 p-3 rounded-xl transition"
        >
          Dashboard
        </Link>

        {role === "student" && (
          <>
            <Link
              to="/mycomplain"
              className="block hover:bg-white/30 p-3 rounded-xl transition"
            >
              My Complaint
            </Link>

            <Link
              to="/complain"
              className="block hover:bg-white/30 p-3 rounded-xl transition"
            >
              New Complaint
            </Link>
          </>
        )}

        {role === "admin" && (
          <Link
            to="/admin"
            className="block hover:bg-white/30 p-3 rounded-xl transition"
          >
            Admin Panel
          </Link>
        )}

      </nav>

    </div>
  );
}
