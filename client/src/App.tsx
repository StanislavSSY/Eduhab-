import { Routes, Route } from "react-router-dom";
import "./App.css";
import Auth from "./pages/Auth/Auth";
import Main from "./components/Main/Main";
import Navbar from "./components/Navbar/Navbar";
import CardProgress from "./components/MyLearnComponents/CardProgress/CardProgress";
import MenuMyLearn from "./components/MyLearnComponents/MenuMyLearn/MenuMyLearn";
import CardMinMyLearn from "./components/MyLearnComponents/CardMinMyLearn/CardMinMyLearn";
import MyLearn from "./pages/MyLearn/MyLearn";
import MyLearnIndex from "./pages/MyLearn/MyLearnIndex.tsx/MyLearnIndex";
import MyLearnCourses from "./pages/MyLearn/MyLearnCourses.tsx/MyLearnCourses";

function App(): JSX.Element {
  return (
    <>
      <Navbar />
      <Auth />
      <Routes>
        <Route index element={<Main />} />
        <Route path="learn" element={<MyLearn />}>
          <Route path="" element={<MyLearnIndex />} />
          <Route path="courses" element={<MyLearnCourses />} />
          <Route path="favorites" />
          <Route path="notifications" />
        </Route>
      </Routes>
    </>
  );
}

export default App;
