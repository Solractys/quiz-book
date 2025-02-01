import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import QuizComponent from "../Components/QuizComponent";

jest.mock("../Components/ProgressBar", () => () => <div>ProgressBar</div>);
jest.mock("../Components/QuizForm", () => () => <div>QuizForm</div>);
jest.mock("../Hooks/useQuizLogic", () => ({
  useQuizLogic: () => ({
    books: [{ title: "Livro 1", writer: "Autor 1" }],
    count: 0,
    points: 0,
    canStart: true,
    needToRestart: false,
    addPoints: jest.fn(),
    restartGame: jest.fn(),
    setCount: jest.fn(),
    setNeedToRestart: jest.fn(),
  }),
}));

describe("QuizComponent", () => {
  it("deve renderizar o botão de iniciar corretamente", () => {
    render(<QuizComponent />);
    expect(screen.getByText("Você tem 1 minuto para responder o máximo de perguntas que conseguir! 🚀")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /play/i })).toBeInTheDocument();
  });

  it("deve iniciar o jogo ao clicar no botão", async () => {
    render(<QuizComponent />);

    const startButton = screen.getByRole("button", { name: /play/i });
    fireEvent.click(startButton);

    await waitFor(() => {
      expect(screen.getByText("QuizForm")).toBeInTheDocument();
    });
  });
});
