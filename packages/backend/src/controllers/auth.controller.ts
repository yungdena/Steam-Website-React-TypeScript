import { Request, Response } from 'express';

import { AuthService } from '../services/auth.service';
import { IUser } from '../models/User';

export class AuthController {
  constructor(private authService: AuthService) {}

  async signUp(req: Request, res: Response) {
    console.log(req.body);
    const user = req.body;
    await this.authService.signUp(user, res);
  }

  async signIn(req: Request, res: Response) {
    const user = req.body;
    await this.authService.signIn(user, res);
  }
}

const authController = new AuthController(new AuthService());
export default authController;
