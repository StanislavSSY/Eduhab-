export type UserType = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
};

export type ITypeState = {
  user: {
    id?: number;
    email?: string;
    firstName?: string;
    lastName?: string;
    img_url?: string;
    createdAt?: Date;
    updatedAt?: Date;
  };
  isLoggedIn: boolean;
};

export type ReviewType = {
  id: number;
  userid: number;
  courseid: number;
  text: string;
  user_rate: number;
  createdAt: Date;
  updatedAt: Date;
  User?: UserType
}

export type ComProps = {
  comment: ReviewType;
}

export type VideoProps = {
  yid: string;
}

export type CardProps = {
  el: CourseType
}

export type ReviewsType = ReviewType[]

export type CourseType = {
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
  long_description: string;
  intro_video: string;
  createdAt: Date;
  updatedAt: Date;
  User?: UserType
};

export type CoursesType = {
  el: CourseType;
};

export type CoursesTypes = CourseType[];

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
  long_description: string;
  intro_video: string;
  createdAt: Date;
  updatedAt: Date;
}

export type BigCourseType = {
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
  long_description: string;
  intro_video: string;
  createdAt: Date;
  updatedAt: Date;
  Modules: ModuleType[];
};

export type ModuleType = {
  id: number;
  courseid: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  Lessons: LessonType[];
};

export type EditModuleType = {
  id: number;
  title: string;
};

export type delModuleType = {
  id: number;
};

export type LessonType = {
  id: number;
  title: string;
  moduleid: number;
  createdAt: Date;
  updatedAt: Date;
};

export type addLessonType = {
  id: number;
  anyLesson: LessonType;
};

export type editLessonType = {
  id: number;
  moduleid: number;
  title: string;
};

export type LessonForDelType = {
  id: number;
  moduleid: number;
};

export type InpType = {
  id: number;
  title: string;
};
