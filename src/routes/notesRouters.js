import express from "express";
import {
  getAllNotes,
  getOneNote,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/notesControllers.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getOneNote);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
