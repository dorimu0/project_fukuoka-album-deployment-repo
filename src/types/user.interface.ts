export type User = {
  id: number;
  email: string;
  name: string;
  comment: string;
  imageUrl: string;
  isSignIn: boolean;
};

export type UserUpdate = Omit<User, "isSignIn">;
