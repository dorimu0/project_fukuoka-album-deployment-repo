export type Member = {
  id: number;
  name: string;
  position: string;
  imageUrl?: string;
};

export type MemberWithoutId = Omit<Member, "id">;

export interface myImage {
  image: string[];
}
