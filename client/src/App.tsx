import Promo from './Pages/Promo/Promo';
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Auth from './pages/Auth/Auth';
import Main from './components/Main/Main';
import Preloader from './components/Preloader/Preloader';
import Navbar from './components/Navbar/Navbar';

import OftenSearched from './components/OftenSearched/OftenSearched';
import FindCourse from './components/FindCourse/FindCourse';

import MainTeachingPage from './components/MyTeachingComponents/MainTeachingPage/MainTeachingPage';

import TeachInfoPage from './Pages/TeachInfoPage/TeachInfoPage';
import MyLearn from './pages/MyLearn/MyLearn';
import MyLearnIndex from './pages/MyLearn/MyLearnIndex.tsx/MyLearnIndex';
import MyLearnCourses from './pages/MyLearn/MyLearnCourses.tsx/MyLearnCourses';
import Layout from './components/Layout';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { addUser } from './store/slice/userSlice';
import NewCourse from './components/MyTeachingComponents/NewCourse/NewCourse';
import Course from './components/Course/Course';
import Info from './components/Course/Info/Info';
import Publication from './components/Course/Info/Publication/Publication';
import EditText from './components/EditLessonComponents/EditText';
import EditLesson from './components/EditLessonComponents/EditLesson';
import LessonSidebarCourse from './components/LessonSidebarCourse/LessonSidebarCourse';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.userSlice.user);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    void (async () => {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/users/sessions`,
        {
          credentials: 'include',
        }
      );

      if (response.status === 200) {
        const result = await response.json();
        dispatch(addUser(result));
        // setTimeout(() => {
        //   setIsAuth(true);
        // }, 3000);
        setIsAuth(true);
      } else {
        // setTimeout(() => {
        //   setIsAuth(true);
        // }, 3000);
        setIsAuth(true);
      }
    })();
  }, []);

  if (!isAuth) {
    return <Preloader />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/teach/info" element={<TeachInfoPage />} />
          <Route path="auth" element={<Auth />} />
          <Route path="promo" element={<Promo />} />
          <Route path="teach/courses" element={<MainTeachingPage />} />
          <Route path="teach/courses/new" element={<NewCourse />} />
          <Route
            path="teach/courses/lesson/:id/step/:stepNum"
            element={<LessonSidebarCourse />}
          />
          <Route path="course/:id" element={<Course />}>
            <Route path="info" element={<Info />} />
            <Route path="plan" />
            <Route path="publication" element={<Publication />} />
          </Route>
          <Route path="learn" element={<MyLearn />}>
            <Route path="" element={<MyLearnIndex />} />
            <Route path="courses" element={<MyLearnCourses />} />
            <Route path="favorites" />
            <Route path="notifications" />
          </Route>
          <Route path="edit-lesson">
            <Route path=":lessonid/step/:stepNum" element={<EditLesson />} />
            <Route path=":lessonid/" element={<EditLesson />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
