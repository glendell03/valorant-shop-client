import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import weaponsSlice from "./weaponsSlice";

const weaponsSliceConfig = {
  key: "weapons",
  storage,
};

export default {
  weapons: persistReducer(weaponsSliceConfig, weaponsSlice),
};
