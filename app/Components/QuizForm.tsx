import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import normalizeString from "../Services/normalizedStrings";

interface QuizFormProps {
  onSubmit: (userResponse: string, writerName: string) => void;
  currentBook: { title: string; writer: string };
  isDisabled: boolean;
}

const QuizForm: React.FC<QuizFormProps> = ({
  onSubmit,
  currentBook,
  isDisabled,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [wrong, setWrong] = useState<boolean>(false);
  const [correct, setCorrect] = useState<boolean>(false);
  const  [author, setAuthor] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userResponse = inputValue;
    const writerName = currentBook.writer;

    const normalizeUserResponse = normalizeString(userResponse);
    const normalizeWriterName = normalizeString(writerName);

    if (normalizeUserResponse === normalizeWriterName) {
      setCorrect(true);
      setAuthor("");
      setTimeout(() => setCorrect(false), 2000);
    } else {
      setWrong(true);
      setAuthor(writerName);
      setTimeout(() => setWrong(false), 3000);
    }

    onSubmit(userResponse, writerName);
    setInputValue("");
  };

  return (
      <>
    <form
      className="flex items-center justify-center gap-3"
      onSubmit={handleSubmit}
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
        disabled={!isDisabled}
      />
      <button type="submit" className="btn btn-primary">
        <ArrowRight color="white" />
      </button>
    </form>
        {wrong && (
            <h1 className={"text-lg text-red-600 font-bold m-3 text-center"}>{author}</h1>
        )}
  </>
  );
};

export default QuizForm;
