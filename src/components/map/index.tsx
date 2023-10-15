import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { RootState } from "../../store";
import { Wrapper, Styles } from "./MapStyles";
import { getAllPoints } from "../../services/location.service";
import { Location } from "../../types/location.interface";
import Album from "../album";

const Map = () => {
  const center = useMemo(() => ({ lat: 33.59, lng: 130.401 }), []); // 고정 위치(Fukuoka)

  const [locations, setLocations] = useState<Location[]>([]); // API로 받아온 위치 정보
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(
    null
  ); // 선택된 location id
  const searchResults = useSelector((state: RootState) => state.search.posts);

  // API로부터 위치 정보를 받아옴
  useEffect(() => {
    (async () => {
      const locs = await getAllPoints();
      setLocations(locs);
    })();
  }, []);

  return (
    <Wrapper>
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
      <Album
        areaId={selectedLocationId}
        showAllPosts={!searchResults.length && selectedLocationId === null}
      />
    </Wrapper>
  );
};

export default Map;
