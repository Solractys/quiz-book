import { useState, useEffect } from "react";
import Book from "../Models/Book";
import searchBooks from "../Services/fetchBooks";

export const useQuizLogic = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [count, setCount] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const canStart = true;
  const [needToRestart, setNeedToRestart] = useState<boolean>(false);

  useEffect(() => {
    const fetchBooks = async () => {
      const apiBooks = await searchBooks();
      if (apiBooks) {
        setBooks(apiBooks);
        setCount(Math.floor(Math.random() * books.length) + 1);
      } else {
        setBooks([
          { title: "O Senhor dos Anéis", writer: "J.R.R. Tolkien" },
          { title: "Pride and Prejudice", writer: "Jane Austen" },
        ]);
      }
    };

    fetchBooks();
  }, [books.length]);

  const addPoints = () => {
    setPoints(points + 15);
    localStorage.setItem("points", JSON.stringify(points));
  };

  const restartGame = async () => {
    const apiBooks = await searchBooks();
    if (apiBooks) {
      setBooks(apiBooks);
    } else {
      setBooks([{ title: "O Senhor dos Anéis", writer: "J.R.R. Tolkien" }]);
    }
    setCount(Math.floor(Math.random() * books.length));
    setNeedToRestart(true);
  };

  return {
    books,
    count,
    points,
    canStart,
    needToRestart,
    addPoints,
    restartGame,
    setCount,
    setNeedToRestart,
  };
};
