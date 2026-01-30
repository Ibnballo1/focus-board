import express from "express"; // ES6 module syntax
import router from "./routes/notesRouters.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
// const express = require("express"); // commonJS syntax

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", router);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
  });
});
