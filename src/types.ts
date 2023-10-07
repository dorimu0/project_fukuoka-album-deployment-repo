export type Location = {
  id: string;
  area: string;
  lat: number;
  lng: number;
};

export type Post = {
  postAreaId?: string;
  title: string;
  content: string;
}