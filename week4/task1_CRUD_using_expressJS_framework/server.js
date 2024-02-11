const express = require("express");

let books = [
  {
    id: "1706854929089",
    title: "ABCACB",
    author: "xyz",
    pages: 600,
  },
  {
    id: "1706854931663",
    title: "ABCACB",
    author: "xyz",
    pages: 600,
  },
  {
    id: "1706854932158",
    title: "ABCACB",
    author: "xyz",
    pages: 600,
  },
  {
    id: "1706854932671",
    title: "ABCACB",
    author: "xyz",
    pages: 600,
  },
  {
    id: "1706854984491",
    title: "ABCACB",
    author: "xyz",
    pages: 600,
  },
];

const keys = ["title", "author", "pages"];

const app = express();

app.use(express.json());


app.get("/books", (req, res) => {
  if (books.length === 0)
    res.end(JSON.stringify({ msg: "No books available." }));
  else 
    res.json(books)
});

app.get("/book/:id", (req, res) => {
  const book = books.filter((b) => b.id == req.params.id);

  if (book.length === 0) {
    res.json({ msg: "Book not found." });
    return;
  }

  res.json(book[0]);
});

app.post("/book", (req, res) => {
  const id = Date.now().toString();
  const newBook = { id };

  for (key of keys) {
    if (!req.body[key]) {
      res.json({ error: "Missing some attribute for book." });
      return;
    }
    newBook[key] = req.body[key];
  }

  books.push(newBook);
  res.json({ msg: "Book added." });
});

app.put("/book/:id", (req, res) => {
  const book = books.filter((b) => b.id == req.params.id);

  if (book.length === 0) {
    res.status(404).json({ msg: "Book not found." });
    return;
  }

  const updatedBook = book[0];
  for (key of keys) {
    if (req.body[key]) {
      updatedBook[key] = req.body[key];
    }
  }

  res.json({ msg: "Book updated." });
});

app.delete("/book/:id", (req, res) => {
  let updatedBooks = books.filter((b) => b.id !== req.params.id);

  if (updatedBooks.length === books.length) {
    res.status(404).json({ msg: "Book not found." });
    return;
  }

  books = updatedBooks;
  res.json({ msg: "Book deleted." });
});



app.listen(8000, () => {
  console.log("App running on port 8000");
});
