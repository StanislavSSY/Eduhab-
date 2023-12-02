import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CourseType } from "../../types";

const initialState = {
  course: {
    id: 1,
    userid: 2,
    title: '',
    old_price: 2,
    new_price: 2,
    image_url: '',
    rate: 2,
    time_passage: '',
    quantity_people: 2,
    short_description: '',
    long_description: '',
    intro_video: '',
  },
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    addCourse: (state, action: PayloadAction<CourseType>) => {
      state.course = action.payload;
    },
    delCourse: (state, action: PayloadAction<CourseType>) => {
      state.course = action.payload;
    },
  },
});

export const { addCourse, delCourse } = courseSlice.actions;
