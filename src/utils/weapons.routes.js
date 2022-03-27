import axios from "axios";

const URL = process.env.REACT_APP_VALORANT_API;
const DB_URL = process.env.REACT_APP_DB_URL;

export const getAllWeapons = () => axios.get(`${URL}/weapons`);

export const getUserWeapons = async () =>
  await axios.get(`${DB_URL}/getAllWeapons.php`);

export const deleteWeapons = async (id) => {
  await axios.delete(`${DB_URL}/delete.php`, {data: { id }});
};
