import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Response } from 'express';
import crypto from 'crypto';

import { IUser, UserModel } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || '10', 10);

export class AuthService {
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async generateToken(user: IUser) {
    const { id, name, email } = user;
    return jwt.sign({ id, name, email }, JWT_SECRET, { expiresIn: "7d" });
  }

  async generateFriendCode(userId: string) {
    const hash = crypto.createHash("sha256");
    hash.update(userId);
    const hashValue = hash.digest("hex");

    const friendCode = hashValue.substring(0, 8);

    return friendCode;
  }

  async signUp(userData: IUser, res: Response) {
    const existingUserWithEmail = await UserModel.findOne({
      email: userData.email,
    });
    if (existingUserWithEmail) {
      res.status(400).send({ message: "Email is already in use" });
      return;
    }

    const existingUserWithName = await UserModel.findOne({
      name: userData.name,
    });
    if (existingUserWithName) {
      res.status(400).send({ message: "Username is already taken" });
      return;
    }

    const password = await this.hashPassword(userData.password);

    if (!userData.avatar) {
      userData.avatar =
        "https://res.cloudinary.com/didkbrlcz/image/upload/v1695624961/System/b5bd56c1aa4644a474a2e4972be27ef9e82e517e_full_pfrgqw.jpg";
    }

    const user = await UserModel.create({ ...userData, password });
    console.log("signUp", user);
    if (!user) {
      res.status(400).send({ message: "Sign up failed" });
      return;
    }

    const friendCode = await this.generateFriendCode(user._id.toString());
    user.friendCode = friendCode;
    await user.save();

    res.send(user);
  }

  async signIn(userData: IUser, res: Response) {
    const user = await UserModel.findOne({ name: userData.name });
    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    const passwordMatched = await this.comparePassword(
      userData.password,
      user.password
    );
    if (!passwordMatched) {
      res.status(403).send({ message: "password" });
      return;
    }

    res.send(user);
  }
}
