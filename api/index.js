import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import errorHandler from "./utils/errorHandler.js";
import userRouter from "./routes/user.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config({
  path: "./.env",
});

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED EXCEPTION! 💥 Shutting Down.....");
  process.exit(1);
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log(`Mongodb Conntected Successfully...`);
  })
  .catch((err) => {
    console.log(err.message);
  });

const __dirname = path.resolve();

const app = express();
app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/listing", listingRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use(errorHandler);

const port = process.env.PORT || 4500;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! 💥 Shutting Down.....");
  server.close(() => {
    process.exit(1);
  });
});
