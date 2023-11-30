export type UserType = {
  id: number,
  isLoggedIn: boolean,
  email: string,
  firstName: string,
  lastName: string,
  avatarUrl: string,
}

export type CourseType = {
  id: number,
  userid: number,
  title: string,
  old_price: number,
  new_price: number,
  image_url: string,
  rate: number,
  time_passage: string,
  quantity_people: number,
  short_description: string,
  logn_description: string,
  intro_video: string,
  createdAt: Date,
  updatedAt: Date,
}

export type CoursesType = {
  el: CourseType
}

export type CoursesTypes = CourseType[]

export interface CourseInt {
  id: number;
  userid: number;
  title: string;
  old_price: number;
  new_price: number;
  image_url: string;
  rate: number;
  time_passage: string;
  quantity_people: number;
  short_description: string;
  logn_description: string;
  intro_video: string;
  createdAt: Date;
  updatedAt: Date;
}