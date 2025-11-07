import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";

// Async thunk to fetch a single book
export const fetchBookDetail = createAsyncThunk(
  "bookDetail/fetchBookDetail",
  async (id, { rejectWithValue }) => {
    try {
      const data = await apiClient.get(`/books/${id}/`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookDetailSlice = createSlice({
  name: "bookDetail",
  initialState: {
    book: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload;
      })
      .addCase(fetchBookDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookDetailSlice.reducer;
