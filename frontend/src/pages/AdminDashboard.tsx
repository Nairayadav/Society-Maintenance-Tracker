import { Building2, ClipboardList, Bell, CheckCircle } from "lucide-react";

const stats = [
  {
    title: "Total Complaints",
    value: "24",
    icon: ClipboardList,
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Resolved",
    value: "18",
    icon: CheckCircle,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Active Notices",
    value: "6",
    icon: Bell,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Residents",
    value: "120",
    icon: Building2,
    color: "bg-purple-100 text-purple-600",
  },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome to the Society Maintenance Tracker Admin Panel.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-xl bg-white shadow-md p-6 border"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    {item.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {item.value}
                  </h2>
                </div>

                <div className={`p-3 rounded-full ${item.color}`}>
                  <Icon size={28} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl bg-white shadow-md border p-6">
        <h2 className="text-xl font-semibold mb-3">
          Recent Activity
        </h2>

        <ul className="space-y-3 text-gray-600">
          <li>• Complaint #102 marked as Resolved.</li>
          <li>• New notice published for Block B.</li>
          <li>• Maintenance request received from Flat A-203.</li>
          <li>• Resident registration approved.</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;