import { Router } from "express";
import communityPostController from "../../controllers/community-post.controller";

const communityRouter: Router = Router();

communityRouter.post(
  "/",
  communityPostController.createPost.bind(communityPostController)
);

communityRouter.patch(
  "/",
  communityPostController.updatePost.bind(communityPostController)
);

communityRouter.delete(
  "/",
  communityPostController.deletePost.bind(communityPostController)
);

export default communityRouter;
