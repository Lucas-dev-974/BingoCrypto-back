export interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  verifiedEmail: boolean;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;

  token?: string;
}
