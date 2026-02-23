import Layout from "../components/Layout";
import { database } from "../firebase";
import { ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";

export default function Dashboard() {

  const [data, setData] = useState([]);

  useEffect(() => {

    const complaintsRef = ref(database, "complaints");

    onValue(complaintsRef, (snapshot) => {
      if (snapshot.exists()) {
        const formatted = Object.values(snapshot.val());
        setData(formatted);
      } else {
        setData([]);
      }
    });

  }, []);

  const total = data.length;
  const pending = data.filter(c => c.status === "pending").length;
  const inProgress = data.filter(c => c.status === "in-progress").length;
  const resolved = data.filter(c => c.status === "resolved").length;

  return (
    <Layout>

      <h2 className="text-3xl font-bold text-white mb-8">
        Dashboard
      </h2>

      <div className="grid md:grid-cols-4 gap-8">

        {/* Total */}
        <div className="bg-white/20 backdrop-blur-xl p-8 rounded-3xl text-white shadow-xl">
          <h3 className="text-lg">Total Complaints</h3>
          <p className="text-5xl font-bold mt-3">{total}</p>
        </div>

        {/* Pending */}
        <div className="bg-yellow-500 p-8 rounded-3xl text-white shadow-xl">
          <h3 className="text-lg">Pending</h3>
          <p className="text-5xl font-bold mt-3">{pending}</p>
        </div>

        {/* In Progress */}
        <div className="bg-blue-500 p-8 rounded-3xl text-white shadow-xl">
          <h3 className="text-lg">In Progress</h3>
          <p className="text-5xl font-bold mt-3">{inProgress}</p>
        </div>

        {/* Resolved */}
        <div className="bg-green-500 p-8 rounded-3xl text-white shadow-xl">
          <h3 className="text-lg">Resolved</h3>
          <p className="text-5xl font-bold mt-3">{resolved}</p>
        </div>

      </div>

    </Layout>
  );
}
