let {books}=require('../booksData')

const keys = ["title", "author", "pages"];

const getAllBooks = (req, res) => {
  if (books.length === 0)
    throw new Error("No books available.")
    // res.status(200).end(JSON.stringify({ msg: "No books available." }));
  else res.json(books);
};

const getABook = (req, res) => {
  const book = books.filter((b) => b.id == req.params.id);

  if (book.length === 0) {
    throw new Error("Book not found.")
    // res.status(404).json({ msg: "Book not found." });
    
  }

  res.status(200).json(book[0]);
};

const addBooks = (req, res) => {
  const id = Date.now().toString();
  const newBook = { id };

  for (key of keys) {
    if (!req.body[key]) {
      throw new Error("Missing some attribute for book.")
      // res.status(400).json({ error: "Missing some attribute for book." });
      
    }
    newBook[key] = req.body[key];
  }

  books.push(newBook);
  res.status(201).json({ msg: "Book added." });
};

const updateBooks = (req, res) => {
  const book = books.filter((b) => b.id == req.params.id);

  if (book.length === 0) {
    throw new Error("Book not found.")
    // res.status(404).json({ msg: "Book not found." });
    
  }

  const updatedBook = book[0];
  for (key of keys) {
    if (req.body[key]) {
      updatedBook[key] = req.body[key];
    }
  }

  res.status(200).json({ msg: "Book updated." });
};

const deleteBooks = (req, res) => {
  let updatedBooks = books.filter((b) => b.id !== req.params.id);

  if (updatedBooks.length === books.length) {
    throw new Error("Book not found.")
    // res.status(404).json({ msg: "Book not found." });
  }

  books = updatedBooks;
  res.status(410).json({ msg: "Book deleted." });
};


module.exports={getAllBooks,getABook,addBooks,updateBooks,deleteBooks};