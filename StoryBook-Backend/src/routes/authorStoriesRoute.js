import express from "express";
import {
  authorStory,
  likeStory,
  commentStory,
} from "../controllers/authorStoriesController.js";

const router = express.Router();

router.post("/", authorStory);
router.get("/list", authorStory);
router.post("/:storyId/like", likeStory);
router.post("/:storyId/comment", commentStory);

export default router; // Export the router to use it in other files
