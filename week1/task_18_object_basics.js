const book = {
  title: "C Programming",
  author: "E balagurusami",
  pages: 500,
  displayinfo() {
    console.log(
      `${this.title} titled book is written by ${this.author} and has ${this.pages} pages.`
    );
  },
};

book.displayinfo();
