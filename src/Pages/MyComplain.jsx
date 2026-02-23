import Layout from "../components/Layout";
import { database, auth } from "../firebase";
import { ref, onValue, get } from "firebase/database";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyComplain() {

  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const checkRoleAndFetch = async () => {

      const uid = auth.currentUser?.uid;

      if (!uid) {
        navigate("/login");
        return;
      }

      const snapshot = await get(ref(database, "users/" + uid));

      if (snapshot.exists()) {

        const userData = snapshot.val();

        if (userData.role !== "student") {
          navigate("/admin"); // ❌ admin ko yahan se hata do
          return;
        }

        const complaintsRef = ref(database, "complaints");

        onValue(complaintsRef, (snap) => {

          if (snap.exists()) {

            const data = snap.val();

            const myData = Object.keys(data)
              .map(key => ({ id: key, ...data[key] }))
              .filter(item => item.userId === uid);

            setList(myData);

          } else {
            setList([]);
          }

        });

      }
    };

    checkRoleAndFetch();

  }, []);

  return (
    <Layout>

      <div className="min-h-screen p-6">

        <h2 className="text-3xl font-bold text-white mb-6">
          My Complaints
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {list.map((c) => (

            <div key={c.id}
              className="bg-white/20 backdrop-blur-xl p-6 rounded-3xl text-white shadow-xl">

              <p className="font-bold text-lg">{c.category}</p>
              <p className="mt-2">{c.description}</p>
              <p className="mt-3">Status: {c.status}</p>

            </div>

          ))}

        </div>

      </div>

    </Layout>
  );
}
