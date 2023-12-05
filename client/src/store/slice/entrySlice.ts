import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  entry: {
    progress: [],
  },
};

export const entrySlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addProgress: (state, action) => {
      state.entry.progress = action.payload;
    },
  },
});

export const { addProgress } = entrySlice.actions;
