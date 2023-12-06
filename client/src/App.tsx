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

//import './App.css';

import Stripe from './components/Stripe/Stripe';
import AppStripe from './components/Stripe/AppStripe';
import Payment from './components/Stripe/YoutubePayment';
import Index from './components/Stripe/YouTubeIndex';

import ProfileSettings from './pages/Profile/ProfileSettings/ProfileSettings';
import ProfileInfo from './pages/Profile/ProfileInfo/ProfileInfo';
import Profile from './pages/Profile/Profile';


import CatalogSearch from './Pages/CatalogSearch/CatalogSearch';
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
        <Route
          path="teach/courses/:courseid/lesson/:lessonid/step/:stepNum"
          element={<LearnCourse />}
        />
        <Route path="learn" element={<MyLearn />}>
          <Route path="" element={<MyLearnIndex />} />
          <Route path="courses" element={<MyLearnCourses />} />
          <Route path="notifications" />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="catalog/search" element={<CatalogSearch />} />
          <Route path="/teach/info" element={<TeachInfoPage />} />
          <Route path="auth" element={<Auth />} />
          <Route path="course/:id/promo" element={<Promo />} />
          <Route path="teach/courses" element={<MainTeachingPage />} />
          <Route path="teach/courses/new" element={<NewCourse />} />
          {/* <Route
            path="teach/courses/lesson/:id"
            element={<LessonSidebarCourse />}
          /> */}
          Index
          <Route path="stripe4" element={<Index />} />
          <Route path="stripe3" element={<Payment />} />
          <Route path="stripe2" element={<Stripe />} />
          <Route path="stripe" element={<AppStripe />} />
          <Route path="course/:id" element={<Course />}>
            <Route path="payment" element={<AppStripe />} />
            <Route path="info" element={<Info />} />
            <Route path="edit" element={<InfoEdit />} />
            <Route path="plan" element={<Plan />} />
            <Route path="plan/edit" element={<PlanEdit />} />
          </Route>
          <Route path="edit-lesson">
            <Route path=":lessonid/step/:stepNum" element={<EditLesson />} />
            <Route path=":lessonid/" element={<EditLesson />} />
          </Route>
          <Route path="user" element={<Profile />}>
            <Route path="profile" element={<ProfileInfo />} />
            <Route path="settings" element={<ProfileSettings />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
