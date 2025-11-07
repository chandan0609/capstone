import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import bookReducer from "./slices/bookSlice";
import borrowReducer from "./slices/borrowSlice";
import categoriesReducer from "./slices/categorySlice";
import usersReducer from "./slices/userSlice";
import bookDetailReducer from "./slices/bookDetailSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookReducer,
    borrows: borrowReducer,
    categories: categoriesReducer,
    users: usersReducer,
    bookDetail: bookDetailReducer,
  },
});

export default store;
