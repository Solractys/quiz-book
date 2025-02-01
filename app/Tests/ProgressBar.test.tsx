import React from "react";
import { render, screen } from "@testing-library/react";
import ProgressBar from "../Components/ProgressBar";
import '@testing-library/jest-dom';

describe("ProgressBar", () => {
  it("deve renderizar o progresso corretamente", () => {
    render(<ProgressBar progress={50} />);

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveStyle("--value: 50");
  });

  it("deve mudar a cor com base no progresso", () => {
    render(<ProgressBar progress={30} />);
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveClass("text-green-500");

    render(<ProgressBar progress={60} />);
    expect(screen.getByRole("progressbar")).toHaveClass("text-yellow-500");

    render(<ProgressBar progress={80} />);
    expect(screen.getByRole("progressbar")).toHaveClass("text-red-500");
  });
});
