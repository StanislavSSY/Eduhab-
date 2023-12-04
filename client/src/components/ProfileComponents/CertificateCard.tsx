import React from 'react';

export default function CertificateCard({ certificate }) {
  return (
    <div style={{ display: 'flex', gap: '40px' }}>
      <img src={certificate.image_url} alt="course" />
      <div>
        <h3>{certificate.title}</h3>
        <p>{`${certificate.percent} пройдено`}</p>
      </div>
    </div>
  );
}
