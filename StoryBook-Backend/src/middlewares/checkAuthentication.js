import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const checkAuthorAuthentication = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

    if (!token) {
      return res.status(403).json({ message: "No token provided." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);
    if (!user || !user.isAuthor) {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform this action." });
    }

    // Attach user info to the request object for further use
    req.user = user;

    next(); // Allow access if authorized
  } catch (error) {
    console.error("Authorization middleware error:", error);
    return res.status(500).json({ message: "Server error. Please try again." });
  }
};

export default checkAuthorAuthentication;
