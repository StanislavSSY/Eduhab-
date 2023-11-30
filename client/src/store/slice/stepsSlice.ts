import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  steps: [
    {
      id: '2',
      type: 'TEXT',
    },
    {
      id: '1',
      type: 'TEXT',
    },
  ]
    .sort((a, b) => Number(a.id) - Number(b.id))
    .map((el, i) => {
      return { ...el, stepNum: String(i + 1) };
    }),
};

export const stepsSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    initSteps: (state, action) => {
      state.steps = initialState.steps;
    },
    delSteps: (state, action) => {
      state.steps = [];
    },
  },
});

export const { initSteps, delSteps } = stepsSlice.actions;
