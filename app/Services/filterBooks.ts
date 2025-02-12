import Book from "../Models/Book";
function filterBooks(apiResponse: unknown): Book[] {
  const allowedAuthors = [
    "J.R.R. Tolkien",
    "Jane Austen",
    "Miguel de Cervantes",
    "George Orwell",
    "Herman Melville",
    "Leo Tolstoy",
    "F. Scott Fitzgerald",
    "Harper Lee",
    "J.D. Salinger",
    "Aldous Huxley",
    "Fyodor Dostoevsky",
    "Nathan Scott",
    "Logan Whitlock",
    "George R. R. Martin",
    "Stephen King",
    "J.K. Rowling",
    "H. P. Lovecraft",
    "Alexandre Dumas",
    "Arthur Conan Doyle",
    "David Copperfield",
    "Willian Faulkner",
    "Ernest Hemingway",
    "Emily Bronte",
    "Charlotte Bronte",
    "Virginia Woolf",
    "Franz Kafka",
    "Wilian Shakespeare",
    "Oscar Wilde",
    "Frank Herbert",
    "Maurice Leblanc",
    "Thomas More",
    "Andrzej Sapkowski",
    "Machado de Assis",
  ];

  if (!apiResponse) {
    console.error("Nenhum livro encontrado na resposta da API.");
    return [];
  }

  const results = Array.isArray(apiResponse) ? apiResponse : [apiResponse];

  let filteredBooks: { title: string; writer: string }[];
  // eslint-disable-next-line prefer-const
  filteredBooks = results
      .filter((book: Book) => allowedAuthors.includes(book.writer))
      .map((book: Book) => ({
        title: book.title,
        writer: book.writer,
      }));

  return filteredBooks;
}

export default filterBooks;
