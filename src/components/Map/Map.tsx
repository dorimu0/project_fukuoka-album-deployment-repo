import React, { useMemo } from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import styled from "styled-components";

const Map = () => {
  const center = useMemo(() => ({ lat: 33.59, lng: 130.401 }), []);

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
          <MarkerF onLoad={onLoad} position={center} />
        </GoogleMap>
      </LoadScript>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .map-container {
    width: 80%;
    height: 500px;
  }
`;

const Styles = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];

export default Map;
