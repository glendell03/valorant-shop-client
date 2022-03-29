import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { logininUserRoute } from "utils/user.routes";

const initialState = {
  id: "",
  username: "",
  firstName: "",
  lastName: "",
  roles: [],
  token: "",
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await logininUserRoute(username, password);
      console.log(res);
      if (res.status === 201) {
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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearState: (state) => {
      state = initialState;
    },
    logout: (state) => {
      storage.removeItem("persist:user");
      state.token = "";
    },
  },

  extraReducers: {
    [loginUser.fulfilled]: (state, { payload }) => {
      state.username = payload.username;
      state.roles = payload.roles;
      state.token = payload.accessToken;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [loginUser.rejected]: (state, { payload }) => {
      console.log("payload", payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.message;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
  },
});

export const userSelector = (state) => state.user;
export const { clearState, logout } = userSlice.actions;
export default userSlice.reducer;
