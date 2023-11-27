import { Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./components/Main/Main";
import Navbar from "./components/Navbar/Navbar";

function App(): JSX.Element {
  return (
    <>
    <Navbar />
    <Routes>
      <Route index element={<Main />} />
    </Routes>
    </>
  );
}

export default App;
