import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import path from "path";
import { connectToDB } from "./db/db.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

const PORT = process.env.PORT || 8000;

connectToDB();

// for build
// app.use(express.static(path.join(__dirname, "./client/build")))

// middlewares
app.use(
  cors({
    // origin: process.env.CLIENT_URL || "http://localhost:5173",
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  return res.json({ message: "Running Healthy!" });
});

app.use("/api/auth", authRoutes);

// for build
// app.use("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
