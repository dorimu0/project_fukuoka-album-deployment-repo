export type Member = {
  id: number;
  name: string;
  position: string;
  imageUrl: string;
};

export type CreateMember = {
  name: string;
  position: string;
  imageUrl?: string;
};

export interface myImage {
  image: string[];
}
