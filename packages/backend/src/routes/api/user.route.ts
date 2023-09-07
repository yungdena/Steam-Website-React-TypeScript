import { Router } from "express";
import userController from "../../controllers/user.controller";

const userRouter: Router = Router();

userRouter.post("/library", userController.addToLibrary.bind(userController));

userRouter.post("/wishlist", userController.addToWishlist.bind(userController)
);

export default userRouter;
