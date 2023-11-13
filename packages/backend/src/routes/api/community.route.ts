import { Router } from "express";
import communityPostController from "../../controllers/community-post.controller";

const communityRouter: Router = Router();

communityRouter.get(
  "/",
  communityPostController.getAllPosts.bind(communityPostController)
);

communityRouter.get(
  "/:id",
  communityPostController.getPostById.bind(communityPostController)
);

communityRouter.post(
  "/",
  communityPostController.createPost.bind(communityPostController)
);

communityRouter.patch(
  "/:id",
  communityPostController.updatePost.bind(communityPostController)
);

communityRouter.delete(
  "/",
  communityPostController.deletePost.bind(communityPostController)
);

export default communityRouter;
