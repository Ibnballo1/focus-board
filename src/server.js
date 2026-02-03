import express from "express";
import router from "./routes/notesRouters.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();
// const express = require("express"); // commonJS syntax

const app = express();
const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: "http://localhost:5173", // Adjust the origin as needed
  }),
);
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", router);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
  });
});
