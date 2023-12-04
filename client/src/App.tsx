import Promo from './Pages/Promo/Promo';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Auth from './pages/Auth/Auth';
import Main from './components/Main/Main';
import Preloader from './components/Preloader/Preloader';

import MainTeachingPage from './components/MyTeachingComponents/MainTeachingPage/MainTeachingPage';

import TeachInfoPage from './Pages/TeachInfoPage/TeachInfoPage';
import MyLearn from './pages/MyLearn/MyLearn';
import Layout from './components/Layout';
import InfoEdit from './components/Course/InfoEdit/InfoEdit';
import Plan from './components/Course/Plan/Plan';
import PlanEdit from './components/Course/Plan/PlanEdit/PlanEdit';
import MyLearnIndex from './pages/MyLearn/MyLearnIndex.tsx/MyLearnIndex';
import MyLearnCourses from './pages/MyLearn/MyLearnCourses.tsx/MyLearnCourses';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { addUser } from './store/slice/userSlice';
import NewCourse from './components/MyTeachingComponents/NewCourse/NewCourse';
import Course from './components/Course/Course';
import Info from './components/Course/Info/Info';
import EditLesson from './components/EditLessonComponents/EditLesson';

import './App.css';

import LearnCourse from './Pages/LearnCourse/LearnCourse';

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
            path="teach/courses/:courseid/lesson/:lessonid/step/:stepNum"
            element={<LearnCourse />}
          />
          {/* <Route
            path="teach/courses/lesson/:id"
            element={<LessonSidebarCourse />}
          /> */}
          <Route path="course/:id" element={<Course />}>
            <Route path="info" element={<Info />} />
            <Route path="edit" element={<InfoEdit />} />
            <Route path="plan" element={<Plan />} />
            <Route path="plan/edit" element={<PlanEdit />} />
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
