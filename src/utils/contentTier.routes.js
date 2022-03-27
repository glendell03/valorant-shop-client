import axios from "axios";

const URL = process.env.REACT_APP_VALORANT_API;

export const getContentTierByUuid = (uuid) =>
  axios.get(`${URL}/contenttiers/${uuid}`);
