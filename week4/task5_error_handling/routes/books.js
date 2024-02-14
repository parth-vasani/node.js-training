const express = require("express");
const {
  getAllBooks,
  getABook,
  addBooks,
  updateBooks,
  deleteBooks,
} = require("../controllers/books");
const { checkForAdmin } = require("../middlewares/users");

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getABook);
router.post("/", checkForAdmin, addBooks);
router.put("/:id", checkForAdmin, updateBooks);
router.delete("/:id", checkForAdmin, deleteBooks);

module.exports = { router };
