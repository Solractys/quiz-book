"use client";
import { useState, useRef } from "react";
import Book from "../Models/Book";
import { ArrowRight, Play, RotateCcw } from "lucide-react";
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
    {
      title: "1984",
      writer: "George Orwell",
    },
    {
      title: "Moby Dick",
      writer: "Herman Melville",
    },
    {
      title: "War and Peace",
      writer: "Leo Tolstoy",
    },
    {
      title: "The Great Gatsby",
      writer: "F. Scott Fitzgerald",
    },
    {
      title: "To Kill a Mockingbird",
      writer: "Harper Lee",
    },
    {
      title: "The Catcher in the Rye",
      writer: "J.D. Salinger",
    },
    {
      title: "Brave New World",
      writer: "Aldous Huxley",
    },
    {
      title: "The Hobbit",
      writer: "J.R.R. Tolkien",
    },
    {
      title: "Crime and Punishment",
      writer: "Fyodor Dostoevsky",
    },
  ]);

  const [count, setCount] = useState<number>(0);
  const [correct, setCorrect] = useState<boolean>(false);
  const [wrong, setWrong] = useState<boolean>(false);
  const [needToRestart, setNeedToRestart] = useState<boolean>(false);
  const [points, setPoints] = useState<number>(0);
  const [duration, setDuration] = useState<number>(10000);
  const [initButton, setInitButton] = useState<boolean>(true);
  const [progress, setProgress] = useState(0);
  const [canStart, setCanStart] = useState(true);
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

  const RestartGame = () => {
    // Fazer request novamente na API e buscar novos livros
    setCount(0);
    setNeedToRestart(true);
  };
  const RestartGameButton = () => {
    setNeedToRestart(false);
    setDuration(30000);
    StartGame();
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userResponse = data.get("userResponse") as string;
    const writerName = books[count].writer;

    checkAnswer(userResponse, writerName);

    event.currentTarget.reset();
  }
  const StartGame = () => {
    if (!canStart) return;

    setInitButton(false);
    setCanStart(false);

    let elapsedTime = 0;
    const intervalDuration = 100;

    const interval = setInterval(() => {
      elapsedTime += intervalDuration;
      const newProgress = Math.min((elapsedTime / duration) * 100, 100);

      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(interval);
        handleGameEnd();
      }
    }, intervalDuration);

    const handleGameEnd = () => {
      setProgress(0);
      setCanStart(true);
      RestartGame();
    };

    return () => clearInterval(interval);
  };

  // const StartGame = () => {
  //   if (!canStart) return;
  //
  //   setInitButton(false);
  //   setCanStart(false);
  //
  //   const startTime = Date.now();
  //
  //   const updateProgress = (interval) => {
  //     const elapsedTime = Date.now() - startTime;
  //     const newProgress = Math.min((elapsedTime / duration) * 100, 100);
  //
  //     setProgress(newProgress);
  //
  //     if (newProgress >= 100) {
  //       clearInterval(interval);
  //       handleGameEnd();
  //     }
  //   };
  //
  //   const handleGameEnd = () => {
  //     setProgress(0);
  //     setCanStart(true);
  //     RestartGame();
  //   };
  //
  //   const interval = setInterval(() => updateProgress(interval), 100);
  //
  //   // Cleanup function in case of unmount
  //   return () => clearInterval(interval);
  // };

  return (
    <div className="flex antialiased items-center justify-center h-screen p-0 space-y-3 flex-col w-full">
      {initButton && (
        <div className="inset-0 space-y-3 backdrop-blur-md absolute z-20 flex items-center justify-center flex-col">
          <p className="font-bold text-xl text-center w-4/5">
            Você tem 30 segundos para responder o máximo de perguntas que
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
          &lsquo;&lsquo; {books[count].title} &lsquo;&lsquo; ?
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
