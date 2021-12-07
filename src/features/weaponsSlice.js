import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllWeaponSkins } from "@/utils/weapons.routes";

const initialState = {
  data: [],
  isError: false,
  isFetching: false,
  isSuccess: false,
  errorMessage: "",
};

export const fetchAllWeaponSkins = createAsyncThunk(
  "/weapons/skins",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllWeaponSkins();
      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error(res.data);
      }
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const weaponsSlice = createSlice({
  name: "weapons",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAllWeaponSkins.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(fetchAllWeaponSkins.fulfilled, (state, action) => {
      state.isFetching = false;
      state.data = action.payload.data;
      state.isSuccess = true;
    });
    builder.addCase(fetchAllWeaponSkins.rejected, (state, action) => {
      state.isFetching = false;
      state.data = [];
      state.isError = true;
      state.errorMessage = action.payload.data;
    });
  },
});

export const selectorWeapons = (state) => state.weapons;
export default weaponsSlice.reducer;
