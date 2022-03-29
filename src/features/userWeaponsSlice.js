import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserWeapons } from "utils/weapons.routes";
import axios from "axios";

const DB_URL = process.env.REACT_APP_DB_URL;

const initialState = {
  weaponsData: [],
  isError: false,
  isFetching: false,
  isSuccess: false,
  errorMessage: "",
};

export const fetchAllWeapons = createAsyncThunk(
  "/userWeapons",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().user;
      const res = await axios.get(`${DB_URL}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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

export const userWeaponsSlice = createSlice({
  name: "userWeapons",
  initialState,
  reducers: {
    resetUserWeaponsState: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllWeapons.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(fetchAllWeapons.fulfilled, (state, action) => {
      state.isFetching = false;
      state.weaponsData = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(fetchAllWeapons.rejected, (state, action) => {
      state.isFetching = false;
      state.weaponsData = [];
      state.isError = true;
      state.errorMessage = action.payload?.message;
    });
  },
});

export const { resetUserWeaponsState } = userWeaponsSlice.actions;
export const selectorUserWeapons = (state) => state.userWeapons;
export default userWeaponsSlice.reducer;
