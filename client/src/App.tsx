import { Routes, Route } from "react-router-dom";
import "./App.css";
import Auth from "./pages/Auth/Auth";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import Layout from "./components/Layout";

function App(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="auth" element={<Auth />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
