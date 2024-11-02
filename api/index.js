import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user/user.route.js";
import authRouter from "./routes/auth/auth.route.js";
import listingRouter from "./routes/listing/listing.route.js";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
const version = 1;
const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.mongoUri)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(port, () => {
  console.log("server running on port 5000");
});

const __dirname = path.resolve();

//Endpoint For user
app.use(`/api/v${version}/user`, userRouter);

//Endpoint for authentication
app.use(`/api/v${version}/auth`, authRouter);

app.use(`/api/v${version}/listing`, listingRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get(
  ("*",
  (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  })
);

//Error Handle MiddleWare
app.use((err, req, res, next) => {
  const error = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(error).json({
    isValid: false,
    error,
    message,
  });
});
