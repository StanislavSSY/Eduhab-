import Promo from "./Pages/Promo/Promo";
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Auth from "./Pages/Auth/Auth";
import Main from "./components/Main/Main";

import Navbar from "./components/Navbar/Navbar";

import OftenSearched from "./components/OftenSearched/OftenSearched";
import FindCourse from "./components/FindCourse/FindCourse";

import MainTeachingPage from "./components/MyTeachingComponents/MainTeachingPage/MainTeachingPage";

import TeachInfoPage from "./Pages/TeachInfoPage/TeachInfoPage";
import MyLearn from "./pages/MyLearn/MyLearn";
import MyLearnIndex from "./pages/MyLearn/MyLearnIndex.tsx/MyLearnIndex";
import MyLearnCourses from "./pages/MyLearn/MyLearnCourses.tsx/MyLearnCourses";
import Layout from "./components/Layout";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { addUser } from "./store/slice/userSlice";
import NewCourse from "./components/MyTeachingComponents/NewCourse/NewCourse";
import Course from "./components/Course/Course";
import Info from "./components/Course/Info/Info";
import Publication from "./components/Course/Publication/Publication";
import InfoEdit from "./components/Course/InfoEdit/InfoEdit";
import Plan from "./components/Course/Plan/Plan";
import PlanEdit from "./components/Course/Plan/PlanEdit/PlanEdit";

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.userSlice.user);

  useEffect(() => {
    void (async () => {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/users/sessions`,
        {
          credentials: "include",
        }
      );

      if (response.status === 200) {
        const result = await response.json();
        dispatch(addUser(result));
      }
    })();
  }, []);

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
        </Route>
      </Routes>
    </>
  );
}

export default App;
