import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  Bell,
  LogOut,
} from "lucide-react";

const ResidentLayout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const menu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/resident",
    },
    {
      name: "Complaints",
      icon: ClipboardList,
      path: "/resident/complaints",
    },
    {
      name: "Notices",
      icon: Bell,
      path: "/resident/notices",
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}

      <aside className="w-64 bg-indigo-900 text-white flex flex-col">

        <div className="p-6 border-b border-indigo-700">

          <h1 className="text-2xl font-bold">
            Resident Portal
          </h1>

        </div>

        <nav className="flex-1 p-4 space-y-2">

          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/resident"}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                    isActive
                      ? "bg-white text-indigo-900 font-semibold"
                      : "hover:bg-indigo-800"
                  }`
                }
              >
                <Icon size={20} />
                {item.name}
              </NavLink>
            );
          })}

        </nav>

        <div className="p-4 border-t border-indigo-700">

          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg bg-red-600 px-4 py-3 hover:bg-red-700 transition"
          >
            <LogOut size={20} />
            Logout
          </button>

        </div>

      </aside>

      {/* Main Content */}

      <div className="flex-1 flex flex-col">

        <header className="bg-white shadow px-8 py-5">

          <h2 className="text-xl font-semibold">
            Society Maintenance Tracker
          </h2>

        </header>

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default ResidentLayout;