import API from "./api";

export const createComplaint = (data: any) =>
  API.post("/complaints/", data);

export const getMyComplaints = () =>
  API.get("/complaints/my");