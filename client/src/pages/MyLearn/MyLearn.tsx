import React from "react";
import MenuMyLearn from "../../components/MyLearnComponents/MenuMyLearn";
import CardProgress from "../../components/MyLearnComponents/CardProgress";
import UserStatMyLearn from "../../components/MyLearnComponents/UserStatMyLearn";
import CardMinMyLearn from "../../components/MyLearnComponents/CardMinMyLearn";
import styled from "./MyLearn.module.css";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

export default function MyLearn() {
  return (
    <>
      <Navbar />
      <div className={styled.container}>
        <MenuMyLearn />
        <div>
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}
