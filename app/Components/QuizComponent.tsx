"use client";
import { useState } from "react";
import { useQuizLogic } from "../Hooks/useQuizLogic";
import ProgressBar from "./ProgressBar";
import QuizForm from "./QuizForm";
import { Play, RotateCcw } from "lucide-react";

const QuizComponent = () => {
  const {
    books,
    count,
    points,
    canStart,
    needToRestart,
    addPoints,
    restartGame,
    setCount,
    setNeedToRestart,
  } = useQuizLogic();

  const [progress, setProgress] = useState<number>(0);
  const [initButton, setInitButton] = useState<boolean>(true);
  const [isDisable, setIsDisable] = useState<boolean>(false);

  const startGame = () => {
    if (!canStart) return;
    setIsDisable(true);
    setInitButton(false);

    let elapsedTime = 0;
    const startTime = Date.now();
    const intervalDuration = 100;

    const interval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      const newProgress = Math.min((elapsedTime / 60000) * 100, 100);

      if (newProgress < 100) {
        setProgress(newProgress);
      } else {
        clearInterval(interval);
        setIsDisable(false);
        setProgress(0);
        restartGame();
      }
    }, intervalDuration);
  };

  const restartGameButton = () => {
    setNeedToRestart(false);
    startGame();
  };

  const checkAnswer = (userResponse: string, writerName: string) => {
    if (userResponse === writerName) {
      if (!(count === books.length - 1)) {
        setCount(Math.floor(Math.random() * books.length));
      } else {
        setNeedToRestart(true);
      }
      addPoints();
    }
  };

  return (
    <div className="flex antialiased items-center justify-center h-screen p-0 space-y-3 flex-col w-full">
      {initButton && (
        <div className="inset-0 space-y-3 backdrop-blur-md absolute z-20 flex items-center justify-center flex-col">
          <p className="font-bold text-xl text-center w-4/5">
            Você tem 1 minuto para responder o máximo de perguntas que
            conseguir! 🚀
          </p>
          <button onClick={startGame} className="btn btn-primary">
            <Play color="white" size={20} />
          </button>
        </div>
      )}
      {needToRestart && (
        <div className="inset-0 space-y-3 backdrop-blur-md absolute z-20 flex items-center justify-center flex-col">
          <p className="font-bold text-xl text-center">Seu tempo acabou! 😔</p>
          <button
            onClick={restartGameButton}
            className="btn btn-primary flex items-center justify-center"
          >
            <RotateCcw color="white" size={15} />
          </button>
        </div>
      )}
      <div className="absolute top-2 left-2 p-4">
        <span className="text-center text-xl font-bold">
          Pontos: <b className="text-yellow-600 font-bold">{points}</b>
        </span>
      </div>
      <h1 className="text-center text-2xl">Quem escreveu o livro</h1>
      <span className="text-center text-xl font-bold">
      &ldquo;{books[count]?.title}&ldquo;?
      </span>
      <QuizForm
          onSubmit={checkAnswer}
          currentBook={books[count]}
          isDisabled={isDisable}
      />
      <ProgressBar progress={progress} />
    </div>
  );
};

export default QuizComponent;
