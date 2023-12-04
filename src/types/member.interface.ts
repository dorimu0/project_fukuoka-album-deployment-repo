export interface Member {
  id: number;
  name: string;
  position: string;
  imageUrl: string;
}

export type MemberWithoutId = Omit<Member, "id">;
