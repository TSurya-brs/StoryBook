import express from "express";
import cors from "cors";
import dotenv from "dotenv";

//Database connection
import connectdb from "./src/config/db.js";
import { notFound, errorHandler } from "./src/middlewares/errMiddleware.js";

//Routes
import userRoute from "./src/routes/userRoute.js";
import authorStoriesRoute from "./src/routes/authorStoriesRoute.js";

const port = process.env.PORT || 9000;
const app = express();
dotenv.config();
connectdb();

app.use(cors());
app.use(express.json());

//sample check of get request
app.get("/", (req, res) => {
  res.send("Hello world");
});

//api calls
app.use("/api/users", userRoute);
app.use("/api/stories", authorStoriesRoute);

//Error Handlers
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log("server is running on port 9000");
});
