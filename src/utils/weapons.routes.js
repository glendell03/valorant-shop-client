import axios from "axios";

const URL = import.meta.env.VITE_VALORANT_API;

export const getAllWeapons = () => axios.get(`${URL}/weapons`);
