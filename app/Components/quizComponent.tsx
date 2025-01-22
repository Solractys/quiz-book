"use client";
import { useState } from "react";
import Book from "../Models/Book";
import { ArrowRight } from "lucide-react";
import normalizeString from "../Services/normalizedStrings";
function QuizComponent() {
  const [count, setCount] = useState<number>(0);
  const [timer, setTimer] = useState<number>(60);
  const startTime = () => {
    setInterval(() => {
      if (timer > 0) setTimer(timer - 1);
    }, 1000);
  };

  const [books, setBooks] = useState<Book[]>([
    {
      title: "O Senhor dos Anéis",
      writer: "J.R.R. Tolkien",
    },
    {
      title: "Pride and Prejudice",
      writer: "Jane Austen",
    },
    {
      title: "Dom Quixote",
      writer: "Miguel de Cervantes",
    },
  ]);
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let userResponse = data.get("userResponse") as string;
    let writerName = books[count].writer;
    normalizeString(userResponse);
    const normalizeUserResponse = normalizeString(userResponse);
    const normalizeWriterName = normalizeString(writerName);

    if (normalizeUserResponse === normalizeWriterName) {
      setCount(count + 1);
      event.currentTarget.reset();
    }
  }
  return (
    <div className="flex items-center justify-center space-y-3 flex-col w-96">
      <h1 className=" text-center text-2xl">Quem escreveu o livro</h1>
      <em className="text-center text-2xl font-bold">
        "{books[count].title}" ?
      </em>
      <form
        className="flex items-center justify-center gap-3"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          className="input input-bordered"
          type="text"
          placeholder="Digite o nome do autor"
          name="userResponse"
        />
        <button type="submit" className="btn btn-primary">
          <ArrowRight color="white" />
        </button>
      </form>
      <button onClick={startTime} className="btn btn-primary">
        start
      </button>
      <div className="p-4 m-2">
        <span className="">
          <span className="font-bold text-xl">{timer}</span>
        </span>
      </div>
    </div>
  );
}
export default QuizComponent;
