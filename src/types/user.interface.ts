export type User = {
  id: string;
  email: string;
  name: string;
  comment: string;
  imageUrl: string;
  isSignIn: boolean;
};

export type UserUpdate = Omit<User, "email" | "password">;
