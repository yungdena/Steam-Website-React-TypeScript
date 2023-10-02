import { Router } from "express";
import libraryController from "../../controllers/library.controller";
import userController from "../../controllers/user.controller";
import friendsController from "../../controllers/friends.controller";
import { userExistsByName } from "../..//middlewares/validate.middleware";

const userRouter: Router = Router();

userRouter.post("/library", libraryController.addToLibrary.bind(libraryController));
userRouter.post("/wishlist", libraryController.addToWishlist.bind(libraryController));

userRouter.get("/library/:id", libraryController.getLibrary.bind(libraryController));
userRouter.get("/wishlist/:id", libraryController.getWishlist.bind(libraryController));


userRouter.delete("/library", libraryController.deleteFromLibrary.bind(libraryController));
userRouter.delete("/wishlist", libraryController.deleteFromWishlist.bind(libraryController));

userRouter.get("/id/:id", userController.getUserById.bind(userController));
userRouter.get("/name/:name", userExistsByName, userController.getUserByName.bind(userController));
userRouter.get("/friendcode/:friendcode", userController.getUserByFriendCode.bind(userController));
userRouter.patch("/update/:id", userController.updateUser.bind(userController));

userRouter.post(
  "/send-friend-request",
  friendsController.sendFriendRequest.bind(friendsController)
);
userRouter.post(
  "/respond-to-friend-request",
  friendsController.respondToFriendRequest.bind(friendsController)
);
userRouter.post(
  "/remove-friend",
  friendsController.removeFriend.bind(friendsController)
);

export default userRouter;
