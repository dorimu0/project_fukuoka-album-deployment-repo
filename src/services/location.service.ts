import { Location } from "../types/location.interface";
import { api } from "./api.service";
import { getAllPosts } from "./post.service";

export const getAllPoints = async (): Promise<Location[]> => {
  const posts = await getAllPosts();

  const areaIds = Array.from(new Set(posts.map((post) => post.postAreaId)));

  let locations = await api("GET", `location`);

  locations = locations.filter((location: Location) =>
    areaIds.includes(location.id)
  );

  return locations;
};

export const getLocationById = async (id: number): Promise<Location> => {
  let location = await api("GET", `location/${id}`);

  return location;
};
