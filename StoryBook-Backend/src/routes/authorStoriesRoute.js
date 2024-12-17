import express from "express";
import {
  authorStory,
  authorStorylist,
  likeStory,
  commentStory,
} from "../controllers/authorStoriesController.js";
import checkAuthorAuthentication from "../middlewares/checkAuthentication.js";

const router = express.Router();

router.post("/", checkAuthorAuthentication, authorStory);
router.get("/list", authorStorylist);
router.post("/:storyId/like", likeStory);
router.post("/:storyId/comment", commentStory);

export default router; // Export the router to use it in other files
