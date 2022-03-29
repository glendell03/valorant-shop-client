import axios from "axios";

const URL = process.env.REACT_APP_VALORANT_API;
const DB_URL = process.env.REACT_APP_DB_URL;

const token = JSON.parse(
  JSON.parse(localStorage.getItem("persist:user")).token
);
const config = { headers: { Authorization: `Bearer ${token}` } };

export const getAllWeapons = () => axios.get(`${URL}/weapons`);

export const getUserWeapons = () => axios.get(`${DB_URL}/orders`, config);

export const deleteWeapons = async (id) =>
  await axios.delete(`${DB_URL}/orders/${id}`, config);

export const insertWeapons = (data) =>
  axios.post(`${DB_URL}/orders`, data, config);
