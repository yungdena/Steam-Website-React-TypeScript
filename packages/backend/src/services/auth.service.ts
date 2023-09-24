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
    return jwt.sign({ id, name, email }, JWT_SECRET, { expiresIn: '7d' });
  }

  async generateFriendCode(userId: string) {
    console.log('generating friend code', userId);
    const hash = crypto.createHash("sha256");
    hash.update(userId);
    const hashValue = hash.digest("hex");

    const friendCode = hashValue.substring(0, 8);

    return friendCode;
  }

  async signUp(userData: IUser, res: Response) {
    console.log('signUp');
    console.log('userdata', userData);
    const password = await this.hashPassword(userData.password);
    const user = await UserModel.create({ ...userData, password });
    console.log('signUp', user);
    if (!user) {
      res.status(400).send({ message: 'sign up failed' });
      return;
    }

    const friendCode = await this.generateFriendCode(user._id.toString());
    user.friendCode = friendCode;
    await user.save();

    res.send(user);
  }

  async signIn(userData: IUser, res: Response) {
    const user = await UserModel.findOne({ name: userData.name });
    console.log("signIn", user);
    if (!user) {
      res.status(404).send({ message: 'User not found' });
      return;
    }

    const passwordMatched = await this.comparePassword(userData.password, user.password);
    if (!passwordMatched) {
      res.status(403).send({ message: 'password' });
      return;
    }

    res.send(user);
  }
}
