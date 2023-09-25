import { Router } from "express";
import { userExistsByName } from "../..//middlewares/validate.middleware";
import userController from "../../controllers/user.controller";

const userRouter: Router = Router();

userRouter.post("/library", userController.addToLibrary.bind(userController));
userRouter.post("/wishlist", userController.addToWishlist.bind(userController));

userRouter.get("/library/:id", userController.getLibrary.bind(userController));
userRouter.get("/wishlist/:id", userController.getWishlist.bind(userController));
userRouter.get("/id/:id", userController.getUserById.bind(userController));
userRouter.get("/name/:name", userExistsByName, userController.getUserByName.bind(userController));
userRouter.get(
  "/friendcode/:friendcode",
  userController.getUserByFriendCode.bind(userController)
);

userRouter.delete("/library", userController.deleteFromLibrary.bind(userController));
userRouter.delete("/wishlist", userController.deleteFromWishlist.bind(userController));

export default userRouter;
