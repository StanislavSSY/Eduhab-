import React from "react";
import MenuMyLearn from "../../components/MyLearnComponents/MenuMyLearn";
import CardProgress from "../../components/MyLearnComponents/CardProgress";
import UserStatMyLearn from "../../components/MyLearnComponents/UserStatMyLearn";
import CardMinMyLearn from "../../components/MyLearnComponents/CardMinMyLearn";
import { Outlet } from "react-router-dom";

export default function MyLearn() {
  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "80px",
      }}
    >
      <MenuMyLearn />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
