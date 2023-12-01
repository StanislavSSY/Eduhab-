import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initSteps, addStep, updateStep, deleteStep } from '../thunkActions';

const initialState = {
  steps: [],
};

export const stepsSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(initSteps.fulfilled, (state, action) => {
      state.steps = action.payload;
    });
    builder.addCase(addStep.fulfilled, (state, action) => {
      const steps = [...state.steps, action.payload]
        .sort((a, b) => Number(a.id) - Number(b.id))
        .map((el, i) => {
          return { ...el, stepNum: String(i + 1) };
        });
      state.steps = steps;
    });
    builder.addCase(updateStep.fulfilled, (state, action) => {
      const steps = [...state.steps, action.payload]
        .sort((a, b) => Number(a.id) - Number(b.id))
        .map((el, i) => {
          return { ...el, stepNum: String(i + 1) };
        });
      state.steps = steps;
    });
    builder.addCase(deleteStep.fulfilled, (state, action) => {
      if (action.payload !== false) {
        const steps = state.steps
          .filter((el) => el.id !== action.payload)
          .sort((a, b) => Number(a.id) - Number(b.id))
          .map((el, i) => {
            return { ...el, stepNum: String(i + 1) };
          });
        state.steps = steps;
      }
    });
  },
});
