import Promo from "./Pages/Promo/Promo";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
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
        dispatch(addUser(result.email));
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
          <Route path="teaching" element={<MainTeachingPage />} />
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
