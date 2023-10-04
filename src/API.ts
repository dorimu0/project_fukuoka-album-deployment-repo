import { Location } from "./types";

export const getAllPoints = async (): Promise<Location[]> => {
  const res = await fetch(`http://localhost:3004/location`);

  if (!res.ok) {
    throw new Error("エラーが発生しました。");
  }

  await new Promise((resolve) => setTimeout(resolve, 1500));

  const locations = await res.json();
  return locations;
};