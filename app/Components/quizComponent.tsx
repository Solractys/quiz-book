"use client";
import { useState } from "react";
import Book from "../Models/Book";
import { ArrowRight, RotateCcw } from "lucide-react";
import normalizeString from "../Services/normalizedStrings";
function QuizComponent() {
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
  const [count, setCount] = useState<number>(0);
  const [timer, setTimer] = useState<number>(60);
  const [correct, setCorrect] = useState<boolean>(false);
  const [wrong, setWrong] = useState<boolean>(false);
  const [needToRestart, setNeedToRestart] = useState<boolean>(false);
  const [points, setPoints] = useState<number>(0);

  function addPoints() {
    setPoints(points + 15);
    localStorage.setItem("points", JSON.stringify(points));
  }

  function checkAnswer(userResponse: string, writerName: string) {
    const normalizeUserResponse = normalizeString(userResponse);
    const normalizeWriterName = normalizeString(writerName);

    if (normalizeUserResponse === normalizeWriterName) {
      if (!(count == books.length - 1)) {
        setCount(count + 1);
      } else {
        setNeedToRestart(true);
      }
      setCorrect(true);
      addPoints();
      setInterval(() => setCorrect(false), 2000);
    } else {
      setWrong(true);
      setInterval(() => setWrong(false), 2000);
    }
  }

  const startTime = () => {
    setInterval(() => {
      if (timer > 0) setTimer(timer - 1);
    }, 1000);
  };
  const RestartGame = () => {
    // Fazer request novamente na API e buscar novos livros
    setCount(0);
    setTimer(60);
    setNeedToRestart(false);
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let userResponse = data.get("userResponse") as string;
    let writerName = books[count].writer;
    checkAnswer(userResponse, writerName);

    event.currentTarget.reset();
  }
  return (
    <div className="flex items-center justify-center space-y-3 flex-col w-full">
      {needToRestart && (
        <>
          <div className="inset-0 bg-zinc-950  absolute z-50 flex items-center justify-center">
            <button
              onClick={RestartGame}
              className="btn btn-primary flex items-center justify-center"
            >
              <RotateCcw color="white" />
            </button>
          </div>
        </>
      )}
      <div className=" right-0 top-0 self-start p-4">
        <span className="text-center text-xl font-bold">
          {" "}
          Pontos: <b className="text-yellow-600 font-bold">{points}</b>{" "}
        </span>
      </div>
      <div className="justify-center items-center flex space-y-3 flex-col">
        <h1 className=" text-center text-2xl">Quem escreveu o livro</h1>
        <em className="text-center text-2xl font-bold">
          "{books[count].title}" ?
        </em>
        <form
          className="flex items-center justify-center gap-3"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            className={`input input-bordered ${wrong ? "input-error" : ""} ${correct ? "input-success" : ""}`}
            type="text"
            placeholder="Digite o nome do autor"
            name="userResponse"
          />
          <button type="submit" className="btn btn-primary">
            <ArrowRight color="white" />
          </button>
        </form>
        {/* <button onClick={startTime} className="btn btn-primary"> */}
        {/*   start */}
        {/* </button> */}
        {/* <div className="p-4 m-2"> */}
        {/*   <span className=""> */}
        {/*     <span className="font-bold text-xl">{timer}</span> */}
        {/*   </span> */}
        {/* </div> */}
      </div>
    </div>
  );
}
export default QuizComponent;
