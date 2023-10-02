import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  constructor(private userService: UserService) {}

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;

    await this.userService.getUserById(id, res);
  }

  async getUserByFriendCode(req: Request, res: Response) {
    const { friendcode } = req.params;

    await this.userService.getUserByFriendCode(friendcode, res);
  }

  async getUserByName(req: Request, res: Response) {
    const { name } = req.params;

    await this.userService.getUserByName(name, res);
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const updatedFields = req.body;

    await this.userService.updateUser(id, updatedFields, res);
  }
}

const userController = new UserController(new UserService());
export default userController;
