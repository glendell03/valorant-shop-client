import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import contentTierSlice from "./contentTierSlice";
import weaponsSlice from "./weaponsSlice";

const weaponsSliceConfig = {
  key: "weapons",
  storage,
};

const contentTierSliceConfig = {
  key: "contentTier",
  storage,
};

export default {
  weapons: persistReducer(weaponsSliceConfig, weaponsSlice),
  contentTier: persistReducer(contentTierSliceConfig, contentTierSlice),
};
