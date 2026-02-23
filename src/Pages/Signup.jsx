import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../firebase";
import { ref, set } from "firebase/database";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Signup() {

  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const role = e.target.role.value;   // 👈 role from dropdown

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await set(ref(database, "users/" + user.uid), {
        name: name,
        email: email,
        role: role   // 👈 save selected role
      });

      Swal.fire("Success 🎉", "Account Created", "success");

      navigate("/login");

    } catch (error) {
      Swal.fire("Error ❌", error.message, "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600">

      <div className="bg-white/20 backdrop-blur-xl shadow-2xl rounded-3xl p-10 w-[400px] text-white">

        <h1 className="text-3xl font-bold text-center mb-4">
          Complaint Portal
        </h1>

        <form onSubmit={register} className="space-y-5">

          <input
            name="name"
            placeholder="Enter Name"
            className="w-full p-3 rounded-xl bg-white/80 text-black"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Enter Email"
            className="w-full p-3 rounded-xl bg-white/80 text-black"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Enter Password"
            className="w-full p-3 rounded-xl bg-white/80 text-black"
            required
          />

          {/* 🔥 Role Selection */}
          <select
            name="role"
            className="w-full p-3 rounded-xl bg-white/80 text-black"
            required
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            className="w-full bg-white text-indigo-600 font-semibold py-3 rounded-xl"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="font-bold underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}
