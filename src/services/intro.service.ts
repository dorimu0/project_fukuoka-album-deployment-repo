import { IntroType } from "../types/intro.interface";
import { api } from "./api.service";

export const getIntro = async (): Promise<IntroType> => {
  const introData = await api("GET", `intro`);

  return introData[0];
};

export const postIntro = async (intro: string): Promise<IntroType> => {
  const introData = await api("POST", `intro`, { intro });

  return introData;
};

export const updateIntro = async (intro: string): Promise<IntroType> => {
  const introData = await api("PUT", `intro/1`, { intro });

  return introData;
};

export const deleteIntro = async () => {
  await api("DELETE", `intro/1`);
};
