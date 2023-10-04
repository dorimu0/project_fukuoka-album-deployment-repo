import React, { useState, useEffect, useMemo } from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import styled from "styled-components";
import { getAllPoints } from "../../API";
import { Location } from "../../types";

const Map = () => {
  const center = useMemo(() => ({ lat: 33.59, lng: 130.401 }), []); // 고정 위치(Fukuoka)

  const [locations, setLocations] = useState<Location[]>([]); // API로 받아온 위치 정보

  // API로부터 위치 정보를 받아옴
  useEffect(() => {
    (async () => {
      const locs = await getAllPoints();
      setLocations(locs);
    })();
  }, []);

  // Marker가 로드될 때 호출되는 함수
  const onLoad = (marker: any) => {
    console.log("marker: ", marker);
  };

  return (
    <Wrapper>
      <LoadScript
        googleMapsApiKey={`${process.env.REACT_APP_PUBLIC_GOOGLE_API_KEY}`}
      >
        <GoogleMap
          zoom={9}
          center={center}
          options={{ disableDefaultUI: true, styles: Styles }}
          mapContainerClassName="map-container"
        >
          {locations.map((location) => (
            <MarkerF
              key={location.id}
              onLoad={onLoad}
              position={{ lat: location.lat, lng: location.lng }}
              onClick={(e) => {console.log(location.area+'입니다')}}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </Wrapper>
  );
};

// 지도 사이즈
const Wrapper = styled.div`
  .map-container {
    width: 80%;
    height: 500px;
    margin: 5rem auto;
  }
`;

// 지도 스타일 옵션
const Styles = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];

export default Map;
