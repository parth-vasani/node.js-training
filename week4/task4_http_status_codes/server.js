const express = require("express");
const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = "secret-key";

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
const users = [];

// middlewares
const checkForAdmin = (req, res, next) => {
  if (!req.headers.role || req.headers.role !== "admin") {
    res.status(403).end(JSON.stringify({ msg: "Admin access required." }));
    return;
  }

  next();
};

const authUser = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    res.status(401).json({ error: "Authentication failed." });
    return;
  }

  try {
    let userId = jwt.verify(token, JWT_SECRET_KEY);
    req.userId = userId;

    next();
  } catch (err) {
    res.status(401).json({ error: "Authentication failed." });
  }
};

//

const app = express();

app.use(express.json());

app.use("/books",authUser);

app.get("/books", authUser, (req, res) => {
  if (books.length === 0)
    res.status(200).end(JSON.stringify({ msg: "No books available." }));
  else res.json(books);
});

app.get("/books/:id", (req, res) => {
  const book = books.filter((b) => b.id == req.params.id);

  if (book.length === 0) {
    res.status(404).json({ msg: "Book not found." });
    return;
  }

  res.status(200).json(book[0]);
});

app.post("/books", checkForAdmin, (req, res) => {
  const id = Date.now().toString();
  const newBook = { id };

  for (key of keys) {
    if (!req.body[key]) {
      res.status(400).json({ error: "Missing some attribute for book." });
      return;
    }
    newBook[key] = req.body[key];
  }

  books.push(newBook);
  res.status(201).json({ msg: "Book added." });
});

app.put("/books/:id", checkForAdmin, (req, res) => {
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

  res.status(200).json({ msg: "Book updated." });
});

app.delete("/books/:id", checkForAdmin, (req, res) => {
  let updatedBooks = books.filter((b) => b.id !== req.params.id);

  if (updatedBooks.length === books.length) {
    res.status(404).json({ msg: "Book not found." });
    return;
  }

  books = updatedBooks;
  res.status(410).json({ msg: "Book deleted." });
});

// USER
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ error: "Missing username or password." });
    return;
  }

  let userExits = false;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username) {
      userExits = true;
      break;
    }
  }

  if (userExits) {
    res.json({ error: "Username already exits." });
    return;
  }

  const userId = Date.now().toString();
  let user = { userId, username, password };
  try {
    const token = jwt.sign({ userId }, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    users.push(user);
    res.status(200).json({ token });

  } 
  catch (err) {
    res.status(502).json({ error: err.toString() });
  }
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  let user = users.filter((u) => u.username === username);
  if (user.length === 0) {
    res.status(200).json({ error: "Username not found." });
    return;
  }

  user = user[0];
  if (user.password !== password) {
    res.status(200).json({ error: "Incorret password" });
    return;
  }

  try {
    let token = jwt.sign({ userId: user.userId }, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (err) {
    res.json({ err });
  }
});

app.listen(8000, () => {
  console.log("App running on port 8000");
});
