import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";

//  Fetch all users (admin only)
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiClient.get("/users/");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//  Fetch user details (admin only)
export const fetchUserDetails = createAsyncThunk(
  "users/fetchUserDetails",
  async (id, { rejectWithValue }) => {
    try {
      const data = await apiClient.get(`/users/${id}/`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    await apiClient.delete(`/users/${id}/`);
    return id;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    userDetails: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearUserDetails: (state) => {
      state.userDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch single user
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { clearUserDetails } = userSlice.actions;
export default userSlice.reducer;
