import { useEffect, useState } from "react";
import {
  ClipboardList,
  Clock,
  CheckCircle,
  Bell,
} from "lucide-react";

import { getDashboard } from "../services/dashboard";

interface DashboardData {
  total_complaints: number;
  pending_complaints: number;
  resolved_complaints: number;
  total_notices: number;
}

const ResidentDashboard = () => {
  const [dashboard, setDashboard] = useState<DashboardData>({
    total_complaints: 0,
    pending_complaints: 0,
    resolved_complaints: 0,
    total_notices: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await getDashboard();
      setDashboard(response.data.dashboard);
    } catch (error) {
      console.error(error);
      alert("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  const cards = [
    {
      title: "Total Complaints",
      value: dashboard.total_complaints,
      icon: ClipboardList,
      color: "bg-red-100 text-red-600",
    },
    {
      title: "Pending Complaints",
      value: dashboard.pending_complaints,
      icon: Clock,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Resolved Complaints",
      value: dashboard.resolved_complaints,
      icon: CheckCircle,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Notices",
      value: dashboard.total_notices,
      icon: Bell,
      color: "bg-blue-100 text-blue-600",
    },
  ];

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Resident Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome to the Society Maintenance Tracker.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="bg-white rounded-xl shadow-md border p-6"
            >
              <div className="flex justify-between items-center">

                <div>
                  <p className="text-gray-500 text-sm">
                    {card.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {card.value}
                  </h2>
                </div>

                <div
                  className={`rounded-full p-3 ${card.color}`}
                >
                  <Icon size={28} />
                </div>

              </div>
            </div>
          );
        })}

      </div>

      <div className="bg-white rounded-xl shadow-md border p-6">

        <h2 className="text-xl font-semibold mb-4">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <button className="rounded-lg bg-indigo-600 text-white py-3 hover:bg-indigo-700 transition">
            Submit New Complaint
          </button>

          <button className="rounded-lg border py-3 hover:bg-gray-100 transition">
            View Notices
          </button>

        </div>

      </div>

    </div>
  );
};

export default ResidentDashboard;