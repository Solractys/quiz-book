"use client";
import { useState, useEffect } from "react";
import Book from "../Models/Book";
import { ArrowRight, Play, RotateCcw } from "lucide-react";
import normalizeString from "../Services/normalizedStrings";
import searchBooks from "../Services/fetchBooks";
function QuizComponent() {
  const [books, setBooks] = useState<Book[]>([]);
  const duration = 60000;
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState<number>(0);
  const [correct, setCorrect] = useState<boolean>(false);
  const [wrong, setWrong] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [points, setPoints] = useState<number>(0);
  const [initButton, setInitButton] = useState<boolean>(true);
  const [canStart, setCanStart] = useState(true);
  const [needToRestart, setNeedToRestart] = useState<boolean>(false);
  const [isDisable, setIsDesable] = useState<boolean>(false);

  useEffect(() => {
    const fetchBooks = async () => {
      const apiBooks = await searchBooks();
      if (apiBooks) {
        setBooks(apiBooks);
        setCount(Math.floor(Math.random() * books.length));
      } else {
        setBooks([
          {
            title: "O Senhor dos Anéis",
            writer: "J.R.R. Tolkien",
          },
          {
            title: "Pride and Prejudice",
            writer: "Jane Austen",
          },
        ]);
      }
    };

    fetchBooks();
  }, [books.length]);

  function addPoints() {
    setPoints(points + 15);
    localStorage.setItem("points", JSON.stringify(points));
  }
  function checkAnswer(userResponse: string, writerName: string) {
    const normalizeUserResponse = normalizeString(userResponse);
    const normalizeWriterName = normalizeString(writerName);

    if (normalizeUserResponse === normalizeWriterName) {
      if (!(count == books.length - 1)) {
        setCount(Math.floor(Math.random() * books.length));
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
    return;
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userResponse = data.get("userResponse") as string;
    const writerName = books[count].writer;

    checkAnswer(userResponse, writerName);
    setInputValue("");
    event.currentTarget.reset();
  }

  const RestartGame = async () => {
    // Fazer request novamente na API e buscar novos livros
    const apiBooks = await searchBooks();
    if (apiBooks) {
      setBooks(apiBooks);
    } else {
      setBooks([{ title: "O Senhor dos Anéis", writer: "J.R.R. Tolkien" }]);
    }
    setCount(Math.floor(Math.random() * books.length));
    setNeedToRestart(true);
    setInputValue("");
  };
  const RestartGameButton = () => {
    setNeedToRestart(false);
    StartGame();
  };
  const StartGame = () => {
    if (!canStart) return;
    setIsDesable(true);
    setInputValue("");
    setInitButton(false);
    setCanStart(false);

    let elapsedTime = 0;
    const startTime = Date.now();
    const intervalDuration = 100;

    const handleGameEnd = () => {
      setIsDesable(false);
      setProgress(0);
      setCanStart(true);
      RestartGame();
    };

    const interval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      const newProgress = Math.min((elapsedTime / duration) * 100, 100);

      if (newProgress < 100) {
        setProgress(newProgress);
      } else {
        clearInterval(interval);
        handleGameEnd();
      }
    }, intervalDuration);
    return () => clearInterval(interval);
  };
  return (
    <div className="flex antialiased items-center justify-center h-screen p-0 space-y-3 flex-col w-full">
      {initButton && (
        <div className="inset-0 space-y-3 backdrop-blur-md absolute z-20 flex items-center justify-center flex-col">
          <p className="font-bold text-xl text-center w-4/5">
            Você tem 1 minuto para responder o máximo de perguntas que
            conseguir! 🚀
          </p>
          <button onClick={StartGame} className="btn btn-primary">
            <Play color="white" size={20} />
          </button>
        </div>
      )}
      {needToRestart && (
        <>
          <div className="inset-0 space-y-3 backdrop-blur-md absolute z-20 flex items-center justify-center flex-col">
            <p className="font-bold text-xl text-center">
              Seu tempo acabou! 😔
            </p>
            <button
              onClick={RestartGameButton}
              className="btn btn-primary flex items-center justify-center"
            >
              <RotateCcw color="white" size={15} />
            </button>
          </div>
        </>
      )}
      <div className="absolute top-2 left-2 p-4">
        <span className="text-center text-xl font-bold">
          {" "}
          Pontos: <b className="text-yellow-600 font-bold">{points}</b>{" "}
        </span>
      </div>
      <div className="justify-center  items-center flex space-y-3 flex-col">
        <h1 className=" text-center text-2xl">Quem escreveu o livro</h1>
        <em className="text-center text-2xl font-bold">
          &lsquo;&lsquo; {books[count]?.title} &lsquo;&lsquo; ?
        </em>
        <form
          className="flex items-center justify-center gap-3"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            id="userResponse"
            className={`input input-bordered ${wrong ? "input-error" : ""} ${correct ? "input-success" : ""}`}
            type="text"
            placeholder="Digite o nome do autor"
            name="userResponse"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            autoComplete="off"
            disabled={!isDisable}
          />
          <button type="submit" className="btn btn-primary">
            <ArrowRight color="white" />
          </button>
        </form>
      </div>
      <div className="w-3/6 top-36 absolute bg-transparent flex justify-center items-center h-fit">
        <div
          className={`radial-progress transition-all ${
            progress < 50
              ? "text-green-500"
              : progress > 75
                ? "text-red-500 animate-ping"
                : "text-yellow-500"
          }`}
          style={{
            "--value": progress,
            "--size": "60px",
            "--thickness": "9px",
          }}
          role="progressbar"
        ></div>
      </div>
      <div className="w-3/6 top-36 absolute bg-transparent flex justify-center items-center h-fit">
        <div
          className={`radial-progress transition-all ${
            progress < 50
              ? "text-green-500"
              : progress > 75
                ? "text-red-500"
                : "text-yellow-500"
          }`}
          style={{
            "--value": progress,
            "--size": "60px",
            "--thickness": "9px",
          }}
          role="progressbar"
        ></div>
      </div>
    </div>
  );
}
export default QuizComponent;
