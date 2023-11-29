import React from "react";
import CertificateCard from "../../../components/ProfileComponents/CertificateCard";

export default function ProfileInfo() {
  const certificatesObjs = [
    { courseImg: "/vite.svg", title: "Введение в linux", percent: "83", id: 1 },
    { courseImg: "/vite.svg", title: "React", percent: "-999", id: 2 },
  ];
  const { firstName, lastName, avatarUrl, completed, certificates } = {
    firstName: "Роман",
    lastName: "Ризо",
    avatarUrl: "/vite.svg",
    completed: "876",
    certificates: certificatesObjs,
  };
  return (
    <div>
      <div>
        <img src={avatarUrl} alt="avatar" />
        <h1>{`${firstName} ${lastName}`}</h1>
      </div>
      <div>
        <h2>Активность</h2>
        <p>
          <strong>{completed}</strong>
        </p>
        <p>Задач решено</p>
      </div>
      <div>
        <h2>Сертификаты</h2>
        <div>
          {certificates.map((el) => (
            <CertificateCard certificate={el} key={el.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
