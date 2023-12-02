import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CourseType } from "../../types";

const initialState = {
  courses: [ {
    id: 0,
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
  } ],
};

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourses: (state, action: PayloadAction<CourseType[]>) => {
      state.courses = action.payload;
    },
    addCoursein: (state, action: PayloadAction<CourseType>) => {
      state.courses.push(action.payload);
    },
    delCoursein: (state, action: PayloadAction<CourseType>) => {
      state.courses = state.courses.filter((el) => el.id !== action.payload.id);
    },
  },
});

export const { addCourses, addCoursein, delCoursein } = coursesSlice.actions;
