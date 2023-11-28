import { Routes, Route } from "react-router-dom";
import "./App.css";
import Auth from "./pages/Auth/Auth";
import Main from "./components/Main/Main";


import Navbar from "./components/Navbar/Navbar";

import OftenSearched from "./components/OftenSearched/OftenSearched";
import FindCourse from "./components/FindCourse/FindCourse";

import TeachInfoPage from "./Pages/TeachInfoPage/TeachInfoPage";
import MyLearn from "./pages/MyLearn/MyLearn";
import MyLearnIndex from "./pages/MyLearn/MyLearnIndex.tsx/MyLearnIndex";
import MyLearnCourses from "./pages/MyLearn/MyLearnCourses.tsx/MyLearnCourses";
import Layout from "./components/Layout";


function App(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/teach/info" element={<TeachInfoPage />} />
          <Route path="auth" element={<Auth />} />
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
