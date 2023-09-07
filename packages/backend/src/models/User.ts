import { Document, Model, model, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  country: string;
  wishlist: string[];
  apps: string[];
}

const userSchema: Schema<any, Model<IUser>> = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
  },
  wishlist: {
    type: Array,
  },
  apps: {
    type: Array,
  }
});

export const User: Model<IUser> = model<IUser>('User', userSchema);
