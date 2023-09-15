export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  country: string;
  library: string[];
  wishlist: string[];
  apps: string[];
  _id: string;
}
