import { useState, useEffect, useMemo } from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import { Wrapper, Styles } from "./MapStyles";
import { getAllPoints } from "../../services/location.service";
import { Location } from "../../types/location.interface";

// Album import 추가
import Album from "../album";

const Map = () => {
  const center = useMemo(() => ({ lat: 33.59, lng: 130.401 }), []); // 고정 위치(Fukuoka)

  const [locations, setLocations] = useState<Location[]>([]); // API로 받아온 위치 정보
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(
    null
  ); // 선택된 location id

  // API로부터 위치 정보를 받아옴
  useEffect(() => {
    (async () => {
      const locs = await getAllPoints();
      setLocations(locs);
    })();
  }, []);

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
              position={{ lat: location.lat, lng: location.lng }}
              onClick={() => setSelectedLocationId(location.id)} // 클릭 시 선택된 id 설정
            />
          ))}
        </GoogleMap>
      </LoadScript>
      {/* 선택된 location에 대한 post 출력 */}
      {selectedLocationId && <Album areaId={selectedLocationId} />}
    </Wrapper>
  );
};

export default Map;
