import { Router } from "express";
import userController from "../../controllers/user.controller";

const userRouter: Router = Router();

userRouter.post("/library", userController.addToLibrary.bind(userController));
userRouter.post("/wishlist", userController.addToWishlist.bind(userController));

userRouter.get("/library/:id", userController.getLibrary.bind(userController));
userRouter.get("/wishlist/:id", userController.getWishlist.bind(userController));

export default userRouter;
