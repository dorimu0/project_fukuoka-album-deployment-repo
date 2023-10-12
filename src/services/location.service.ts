import { Location } from "../types/location.interface";
import { getAllPosts } from "./post.service";

export const getAllPoints = async (): Promise<Location[]> => {
  const posts = await getAllPosts();

  const areaIds = Array.from(new Set(posts.map((post) => post.postAreaId)));

  let res = await fetch(`http://localhost:3004/location`);

  if (!res.ok) {
    throw new Error("Failed to fetch locations.");
  }

  let locations = await res.json();

  locations = locations.filter((location: Location) =>
    areaIds.includes(location.id)
  );

  return locations;
};
