import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  user: {
    isLoggedIn: false,
    email: "",
    firstName: "",
    lastName: "",
    avatarUrl: "",
  },
};

export const userSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<string>) => {
      state.user.email = action.payload;
      state.user.isLoggedIn = true;
    },
    delUser: (state, action: PayloadAction<string>) => {
      state.user.email = action.payload;
      state.user.isLoggedIn = false;
    },
  },
});

export const { addUser, delUser } = userSlice.actions;
