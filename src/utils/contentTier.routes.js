import axios from "axios";

const URL = process.env.VITE_VALORANT_API;

export const getContentTierByUuid = (uuid) =>
  axios.get(`${URL}/contenttiers/${uuid}`);
