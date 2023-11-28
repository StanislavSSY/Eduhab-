import { Routes, Route } from "react-router-dom";
import "./App.css";
import Auth from "./pages/Auth/Auth";
import Main from "./components/Main/Main";
import Navbar from "./components/Navbar/Navbar";
import OftenSearched from "./components/OftenSearched/OftenSearched";
import FindCourse from "./components/FindCourse/FindCourse";

function App(): JSX.Element {
  return (
    <>
      <Navbar />
      <Auth />
     <FindCourse />
      <OftenSearched />
      <Routes>
        <Route index element={<Main />} />
      </Routes>
    </>
  );
}

export default App;
