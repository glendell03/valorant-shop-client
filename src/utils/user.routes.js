import axios from "axios";

const DB_URL = process.env.REACT_APP_DB_URL;

export const logininUserRoute = (username, password) =>
  axios.post(`${DB_URL}/login`, { username, password });
