import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import QuizForm from "../Components/QuizForm";

describe("QuizForm", () => {
  const mockOnSubmit = jest.fn();
  const currentBook = { title: "Livro 1", writer: "Autor 1" };

  it("deve renderizar o formulário corretamente", () => {
    render(
      <QuizForm
        onSubmit={mockOnSubmit}
        currentBook={currentBook}
        isDisabled={false}
      />
    );

    expect(screen.getByPlaceholderText("Digite o nome do autor")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("deve chamar onSubmit ao enviar o formulário", () => {
    render(
      <QuizForm
        onSubmit={mockOnSubmit}
        currentBook={currentBook}
        isDisabled={false}
      />
    );

    const input = screen.getByPlaceholderText("Digite o nome do autor");
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "Autor 1" } });
    fireEvent.click(button);

    expect(mockOnSubmit).toHaveBeenCalledWith("Autor 1", "Autor 1");
  });

  it("deve exibir erro ao enviar resposta incorreta", () => {
    render(
      <QuizForm
        onSubmit={mockOnSubmit}
        currentBook={currentBook}
        isDisabled={false}
      />
    );

    const input = screen.getByPlaceholderText("Digite o nome do autor");
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "Autor Errado" } });
    fireEvent.click(button);

    expect(input).toHaveClass("input-error");
  });
});
