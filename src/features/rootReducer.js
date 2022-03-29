/* eslint-disable import/no-anonymous-default-export */
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import contentTierSlice from "./contentTierSlice";
import weaponsSlice from "./weaponsSlice";
import userWeaponsSlice from "./userWeaponsSlice";
import userSlice from "./userSlice";

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

const userSliceConfig = {
  key: "user",
  storage,
};

export default {
  weapons: persistReducer(weaponsSliceConfig, weaponsSlice),
  userWeapons: persistReducer(userWeaponsSliceConfig, userWeaponsSlice),
  contentTier: persistReducer(contentTierSliceConfig, contentTierSlice),
  user: persistReducer(userSliceConfig, userSlice),
};
