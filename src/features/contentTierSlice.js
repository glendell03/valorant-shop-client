import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getContentTierByUuid } from "@/utils/contentTier.routes";

const initialState = {
  contentTierData: [],
  isError: false,
  isFetching: false,
  isSuccess: false,
  errorMessage: "",
};

export const fetchContentTierByUuid = createAsyncThunk(
  `contenttier/:uuid`,
  async (uuid, { rejectWithValue }) => {
    try {
      const res = await getContentTierByUuid(uuid);
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

export const contentTierSlice = createSlice({
  name: "contentTier",
  initialState,
  reducers: {
    resetContentTierState: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContentTierByUuid.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(fetchContentTierByUuid.fulfilled, (state, action) => {
      state.isFetching = false;
      state.contentTierData = action.payload.data;
      state.isSuccess = true;
    });
    builder.addCase(fetchContentTierByUuid.rejected, (state, action) => {
      state.isFetching = false;
      state.contentTierData = [];
      state.isError = true;
      state.errorMessage = action.payload.data;
    });
  },
});

export const { resetContentTierState } = contentTierSlice.actions;
export const SelectorContentTier = (state) => state.contentTier;
export default contentTierSlice.reducer;
