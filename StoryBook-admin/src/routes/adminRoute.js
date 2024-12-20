import express from "express";
import {
  adminLogin,
  adminDashboard,
  userList,
  deleteUser,
  storiesList,
  deleteStory,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/dashboard", adminDashboard);
router.get("/users", userList);
router.delete("/delete_user/:user_id", deleteUser);
router.get("/stories", storiesList);
router.delete("/delete_story/:story_id", deleteStory);

export default router;
