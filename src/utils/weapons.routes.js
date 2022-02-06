import axios from "axios";

const URL = import.meta.env.VITE_VALORANT_API;
const DB_URL = import.meta.env.VITE_DB_URL;

export const getAllWeapons = () => axios.get(`${URL}/weapons`);

export const getUserWeapons = async () => await axios.get(`${DB_URL}/getAllWeapons.php`)
