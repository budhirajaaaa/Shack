import express from "express";
import dotenv from "dotenv";
import mongoConnect from "./config/db.js";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import postRouter from "./routes/postRoutes.js";
import path from "path";
const app = express();
const PORT = 4000;

dotenv.config();
app.use(cors());
app.use(express.json());
mongoConnect();
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server running at port: ${PORT}`);
  } else {
    console.log(`Error in running server ERR: ${error}`);
  }
});
