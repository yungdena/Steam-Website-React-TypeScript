import { Router } from "express";
import multer from "multer";

import libraryController from "../../controllers/library.controller";
import userController from "../../controllers/user.controller";
import friendsController from "../../controllers/friends.controller";
import { userExistsByName } from "../..//middlewares/validate.middleware";
import path from "path";

const userRouter: Router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../../uploads/avatars"));
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

userRouter.post("/library", libraryController.addToLibrary.bind(libraryController));
userRouter.post("/wishlist", libraryController.addToWishlist.bind(libraryController));
userRouter.post(
  "/update-avatar/:id",
  upload.single("avatar"),
  userController.updateAvatar.bind(userController)
);

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
