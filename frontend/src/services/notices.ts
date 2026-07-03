import API from "./api";

export const getNotices = () =>
  API.get("/notices/");