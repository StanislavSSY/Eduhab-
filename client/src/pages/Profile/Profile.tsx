import React from "react";
import ProfileMenu from "../../components/ProfileComponents/ProfileMenu";
import { Outlet } from "react-router-dom";

export default function Profile() {
  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "80px",
      }}
    >
      <ProfileMenu />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
