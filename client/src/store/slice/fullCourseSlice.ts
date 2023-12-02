import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addLessonType, BigCourseType, delModuleType, editLessonType, EditModuleType, LessonForDelType, LessonType, ModuleType } from "../../types";

const initialState = {
  course: {
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
    createdAt: new Date(),
    updatedAt: new Date(),
    Modules: [
      {
        id: 0,
        courseid: 1,
        title: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        Lessons: [
          {
            id: 0,
            title: '',
            moduleid: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        ]
      }
    ]
  },
};

export const fullCourseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    addfullCourse: (state, action: PayloadAction<BigCourseType>) => {
      state.course = action.payload;
    },
    // addfirstModule: (state, action: PayloadAction<ModuleType>) => {
    //   state.course.Modules = action.payload;
    // },
    addModule: (state, action: PayloadAction<ModuleType>) => {
      state.course.Modules.push(action.payload);
    },
    editModule: (state, action: PayloadAction<EditModuleType>) => {
      state.course.Modules.forEach((el) => {
        if (el.id === action.payload.id) {
          el.title = action.payload.title;
        }
      });
    },
    delModule: (state, action: PayloadAction<delModuleType>) => {
      state.course.Modules = state.course.Modules.filter((el) => el.id !== action.payload.id);
    },
    addLesson: (state, action: PayloadAction<addLessonType>) => {
      state.course.Modules.forEach((el) => {
        if (el.id === action.payload.id) {
          el.Lessons.push(action.payload.anyLesson)
        }
      });
    },
    editLesson: (state, action: PayloadAction<editLessonType>) => {
      state.course.Modules.forEach((el) => {
        if (el.id === action.payload.moduleid) {
          el.Lessons.forEach((elem) => {
            if (elem.id === action.payload.id) {
              elem.title = action.payload.title;
            }
          })
        }
      });
    },
    delLesson: (state, action: PayloadAction<LessonForDelType>) => {
      state.course.Modules.forEach((el) => {
        if (el.id === action.payload.moduleid) {
          el.Lessons = el.Lessons.filter((elem) => elem.id !== action.payload.id)
        }
      })
    },
    delCourse: (state, action: PayloadAction<BigCourseType>) => {
      state.course = action.payload;
    },
  },
});

export const { addfullCourse,addModule, editModule, delModule, addLesson, delLesson, editLesson, delCourse } = fullCourseSlice.actions;
