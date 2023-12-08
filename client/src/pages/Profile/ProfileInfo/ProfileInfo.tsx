import React, { useEffect, useState } from 'react';
import CertificateCard from '../../../components/ProfileComponents/CertificateCard';
import axios from 'axios';
import { useAppSelector } from '../../../store/hooks';
import MyLearnIndex from '../../MyLearn/MyLearnIndex.tsx/MyLearnIndex';

export default function ProfileInfo() {
  const [completedNum, setCompletedNum] = useState('');
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    void (async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/entries/info`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        const courses = response.data;
        const completedSteps = courses.reduce(
          (acc, el) => acc + el.progress.length,
          0
        );
        const certs = courses
          .map((el) => ({
            id: el.id,
            title: el.title,
            image_url: el.image_url,
            percent: Math.floor((el.progress.length / el.count) * 100),
          }))
          .filter((el) => el.percent > 85);
        setCompletedNum(String(completedSteps));
        setCertificates(certs);
      }
    })();
  }, []);
  return (
    <div>
      <MyLearnIndex title="Профиль" />

      <div style={{ marginTop: '15px' }}>
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
