import { Routes, Route } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import ResidentLayout from "../layouts/ResidentLayout";

import AdminDashboard from "../pages/AdminDashboard";
import ResidentDashboard from "../pages/ResidentDashboard";
import Complaints from "../pages/Complaints";
import Notices from "../pages/Notices";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="complaints" element={<Complaints />} />
        <Route path="notices" element={<Notices />} />
      </Route>

      {/* Resident */}
      <Route path="/resident" element={<ResidentLayout />}>
        <Route index element={<ResidentDashboard />} />
        <Route path="complaints" element={<Complaints />} />
        <Route path="notices" element={<Notices />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;