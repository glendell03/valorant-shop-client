import axios from "axios";

const URL = import.meta.env.VITE_VALORANT_API;

export const getAllWeaponSkins = () => axios.get(`${URL}/weapons/skins`);

export const getAllWeapons = () => axios.get(`${URL}/weapons`);
