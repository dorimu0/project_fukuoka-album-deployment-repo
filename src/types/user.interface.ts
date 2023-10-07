export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  comment: string;
  imageUrl: string;
};

export type UserUpdate = Omit<User, "email" | "password">;
