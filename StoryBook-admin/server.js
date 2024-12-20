import express from "express";
import dotenv from "dotenv";
import cors from "cors";

//MongoDB connection
import connectdb from "./src/config/db.js";

//Error Handlers
import { notfound, errorhandler } from "./src/middlewares/errMiddleware.js";

//Routes
import adminRoute from "./src/routes/adminRoute.js";

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
connectdb();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./src/views"); // Make sure your views are in the correct directory

app.use("/api/admin", adminRoute);

//Error Handlers
app.use(notfound);
app.use(errorhandler);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
