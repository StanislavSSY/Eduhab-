import { Routes, Route } from "react-router-dom";
import "./App.css";
import Auth from "./pages/Auth/Auth";
import Main from "./components/Main/Main";
import Navbar from "./components/Navbar/Navbar";
import TeachInfoPage from "./Pages/TeachInfoPage/TeachInfoPage";

function App(): JSX.Element {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route index element={<Main />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/teach/info" element={<TeachInfoPage />} />
      </Routes>
    </>
  );
}

export default App;
