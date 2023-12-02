import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../types";

const initialState = {
  user: {
    id: 1,
    isLoggedIn: false,
    email: "",
    firstName: "",
    lastName: "",
    avatarUrl: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserType>) => {
      state.user.id = action.payload.id;
      state.user.email = action.payload.email;
      state.user.isLoggedIn = true;
      state.user.firstName = action.payload.firstName;
      state.user.lastName = action.payload.lastName;
    },
    delUser: (state, action: PayloadAction<string>) => {
      state.user.email = action.payload;
      state.user.isLoggedIn = false;
    },
  },
});

export const { addUser, delUser } = userSlice.actions;