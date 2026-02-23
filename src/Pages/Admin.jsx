import Layout from "../components/Layout";
import { database, auth } from "../firebase";
import { ref, onValue, update, get } from "firebase/database";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Admin() {

  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const checkRole = async () => {
      const uid = auth.currentUser?.uid;

      if (!uid) {
        navigate("/login");
        return;
      }

      const snapshot = await get(ref(database, "users/" + uid));

      if (snapshot.exists()) {
        const userData = snapshot.val();

        if (userData.role !== "admin") {
          navigate("/dashboard"); // ❌ student ko admin panel se hata do
        }
      }
    };

    checkRole();

    const complaintsRef = ref(database, "complaints");

    const unsubscribe = onValue(complaintsRef, (snapshot) => {

      if (snapshot.exists()) {
        const data = snapshot.val();

        const formatted = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));

        setList(formatted);
      } else {
        setList([]);
      }

    });

    return () => unsubscribe();

  }, []);

  const updateStatus = (id, status) => {
    update(ref(database, "complaints/" + id), { status });
    Swal.fire("Updated ✅", "Status Updated", "success");
  };

  return (
    <Layout>

      <h2 className="text-2xl font-bold mb-6 text-indigo-600">
        Admin Panel
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {list.map((c) => (

          <div
            key={c.id}
            className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-3xl shadow-xl"
          >

            <p className="text-lg font-bold">
              👤 {c.userName}
            </p>

            <p className="mt-2">
              📂 Category: {c.category}
            </p>

            <p className="mt-2">
              📝 {c.description}
            </p>

            <p className="mt-2">
              📌 Status: {c.status}
            </p>

            <select
              value={c.status}
              onChange={(e) => updateStatus(c.id, e.target.value)}
              className="mt-4 w-full p-2 rounded text-black"
            >
              <option value="pending">pending</option>
              <option value="in-progress">in-progress</option>
              <option value="resolved">resolved</option>
            </select>

          </div>

        ))}

      </div>

    </Layout>
  );
}
