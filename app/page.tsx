"use client";
import React, { useEffect, useState } from "react";
import { searchBooks } from "./api/books";

function Home() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const response = searchBooks("Jane Austen");
    setBooks(response);
    console.log(books);
  }, []);
  return (
    <main>
      <div>
        {books.length > 0 ? (
          <ul>
            {books.map((book) => (
              <li key={book.id}>{book.volumeInfo.title}</li>
            ))}
          </ul>
        ) : (
          <p>No books found</p>
        )}
      </div>
    </main>
  );
}
export default Home;
