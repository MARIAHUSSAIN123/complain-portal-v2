import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../firebase";
import { ref, get } from "firebase/database";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {

      // 🔐 Firebase Auth Login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const uid = userCredential.user.uid;

      // 🔥 Fetch user role from Realtime Database
      const snapshot = await get(ref(database, "users/" + uid));

      if (snapshot.exists()) {

        const userData = snapshot.val();

        Swal.fire("Success 🎉", "Login Successful", "success");

        // 🎯 Role Based Navigation
        if (userData.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }

      } else {
        Swal.fire("Error ❌", "User data not found", "error");
      }

    } catch (error) {
      Swal.fire("Error ❌", error.message, "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600">

      <div className="bg-white/20 backdrop-blur-xl shadow-2xl rounded-3xl p-10 w-[400px] text-white">

        <h1 className="text-3xl font-bold text-center mb-2">
          Complaint Portal
        </h1>

        <p className="text-center mb-6 opacity-80">
          Welcome Back
        </p>

        <form onSubmit={login} className="space-y-5">

          <input
            name="email"
            type="email"
            placeholder="Enter Email"
            className="w-full p-3 rounded-xl bg-white/80 text-black focus:outline-none"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Enter Password"
            className="w-full p-3 rounded-xl bg-white/80 text-black focus:outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-white text-indigo-600 font-semibold py-3 rounded-xl hover:bg-gray-200 transition"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link to="/" className="font-bold underline">
            Signup
          </Link>
        </p>

      </div>

    </div>
  );
}
