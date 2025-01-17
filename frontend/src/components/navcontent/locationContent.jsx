import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import styles from "./location.module.css";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const locations = [
  {
    id: 1,
    title: "발레 / 현대무용",
    address: "예다움 스튜디오(신촌 르메이르타운5 4층, 신촌역 4번출구 도보 1분)",
    position: { lat: 37.5557525, lng: 126.9381006 },
  },
  {
    id: 2,
    title: "한국무용",
    address: "925 연습실(마포구 노고산동 56-23 지하1층, 신촌역 도보 3분)",
    position: { lat: 37.5547358, lng: 126.9335499 },
  },
];

function LocationContent() {
  return (
    <div className={styles.locationContainer}>
      <h2 className={styles.locationHeader}>수업 장소</h2>
      <p className={styles.notice}><span className="root-color">장소 변동시 안내드릴 예정입니다.</span></p>
      {locations.map((loc) => (
        <div key={loc.id} className={styles.locationItem}>
          <h3 className={styles.locationTitle}>{loc.title}</h3>
          <p className={styles.locationAddress}>{loc.address}</p>
          <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={loc.position}
              zoom={18}
            >
              <Marker position={loc.position} />
            </GoogleMap>
          </LoadScript>
        </div>
      ))}
    </div>
  );
}

export default LocationContent;
