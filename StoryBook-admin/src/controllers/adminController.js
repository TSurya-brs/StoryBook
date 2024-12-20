import User from "../models/adminModel.js";
import Story from "../models/storiesModel.js";
import bcrypt from "bcrypt";

const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  try {
    const user = await User.findOne({ email });
    // console.log("User object:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isAdmin !== true) {
      return res.status(400).json({ message: "You are not an admin" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    return res.status(200).json({ message: "Admin logged in successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Error logging in" });
  }
};

//Dashboard data
const adminDashboard = async (req, res, next) => {
  try {
    const userCount = await User.countDocuments({ isAdmin: { $ne: true } });
    const storyCount = await Story.countDocuments();
    return res.render("dashboard", {
      userCount,
      storyCount,
    });
  } catch (error) {
    console.log("Error:", error);
    return res
      .status(500)
      .json({ message: "Error on fetching the count of users and stories" });
  }
};

const userList = async (req, res, next) => {
  try {
    const users = await User.find({ isAdmin: { $ne: true } });
    res.render("users", { users });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Error fetching user list" });
  }
};

const storiesList = async (req, res, next) => {
  try {
    const stories = await Story.find();
    return res.render("stories", { stories });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Error fetching stories list" });
  }
};

const deleteUser = async (req, res) => {
  const user_id = req.params.id;
  try {
    const user = await User.deleteOne({
      user_id: req.params.id,
      isAdmin: { $ne: true },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // return res.status(200).json({ message: "User deleted successfully" });
    res.redirect("/admin/users");
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Error deleting user" });
  }
};

const deleteStory = async (req, res) => {
  const story_id = req.params.id;
  try {
    const story = await Story.deleteOne(story_id);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }
    // return res.status(200).json({ message: "Story deleted successfully" });
    res.redirect("/stories");
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Error deleting story" });
  }
};

export {
  adminLogin,
  adminDashboard,
  userList,
  storiesList,
  deleteStory,
  deleteUser,
};
