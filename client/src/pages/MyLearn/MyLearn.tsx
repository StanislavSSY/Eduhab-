import React from "react";
import MenuMyLearn from "../../components/MyLearnComponents/MenuMyLearn/MenuMyLearn";
import CardProgress from "../../components/MyLearnComponents/CardProgress/CardProgress";
import UserStatMyLearn from "../../components/MyLearnComponents/UserStatMyLearn/UserStatMyLearn";
import CardMinMyLearn from "../../components/MyLearnComponents/CardMinMyLearn/CardMinMyLearn";
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
      <main>
        <Outlet />
      </main>
    </div>
  );
}
