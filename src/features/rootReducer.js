import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import contentTierSlice from "./contentTierSlice";
import weaponsSlice from "./weaponsSlice";
import userWeaponsSlice from "./userWeaponsSlice";

const weaponsSliceConfig = {
  key: "weapons",
  storage,
};

const userWeaponsSliceConfig = {
  key: "userWeapons",
  storage,
};

const contentTierSliceConfig = {
  key: "contentTier",
  storage,
};

export default {
  weapons: persistReducer(weaponsSliceConfig, weaponsSlice),
  userWeapons: persistReducer(userWeaponsSliceConfig, userWeaponsSlice),
  contentTier: persistReducer(contentTierSliceConfig, contentTierSlice),
};
