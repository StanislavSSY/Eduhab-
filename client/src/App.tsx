import { Routes, Route } from "react-router-dom";
import "./App.css";
import Auth from "./pages/Auth/Auth";
import Main from "./components/Main/Main";
import Navbar from "./components/Navbar/Navbar";

function App(): JSX.Element {
  return (
    <>
      <Auth />
      <Navbar />
      <Routes>
        <Route index element={<Main />} />
      </Routes>
    </>
  );
}

export default App;
