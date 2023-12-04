import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITypeState, UserType } from "../../types";

const initialState: ITypeState = {
  user: {
    firstName: '',
    lastName: '',
  },
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    delUser: (state, action: PayloadAction<UserType>) => {
      state.user = initialState.user;
      state.isLoggedIn = false;
    },
  },
});

export const { addUser, delUser } = userSlice.actions;