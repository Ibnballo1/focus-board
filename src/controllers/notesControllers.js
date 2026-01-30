import Note from "../models/Note.js";

const getAllNotes = async (_, res) => {
  // underscore _ is used to indicate that we are not using the first parameter (req)
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOneNote = async (req, res) => {
  try {
    const id = req.params.id;
    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(note);
  } catch (error) {
    console.error("Error fetching note:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json({ message: "Note created successfully" });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateNote = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true },
    );
    if (!updatedNote) return res.status(404).json(updatedNote);
    res
      .status(200)
      .json({ message: `Note with id ${id} updated successfully` });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteNote = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });
    res
      .status(200)
      .json({ message: `Note with id ${id} deleted successfully` });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getAllNotes, getOneNote, createNote, updateNote, deleteNote };
