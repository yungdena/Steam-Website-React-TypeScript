import { Router } from "express";
import userController from "../../controllers/user.controller";

const userRouter: Router = Router();

userRouter.post("/library", userController.addToLibrary.bind(userController));
userRouter.post("/wishlist", userController.addToWishlist.bind(userController));

userRouter.get("/library/:id", userController.getLibrary.bind(userController));
userRouter.get("/wishlist/:id", userController.getWishlist.bind(userController));

userRouter.delete("/library", userController.deleteFromLibrary.bind(userController));
userRouter.delete("/wishlist", userController.deleteFromWishlist.bind(userController));

export default userRouter;
