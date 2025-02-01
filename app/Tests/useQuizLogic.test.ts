import { renderHook} from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import { useQuizLogic } from "../Hooks/useQuizLogic";

jest.mock("../Services/fetchBooks", () => ({
  searchBooks: jest.fn(() =>
    Promise.resolve([
      { title: "Livro 1", writer: "Autor 1" },
      { title: "Livro 2", writer: "Autor 2" },
    ]),
  ),
}));

describe("useQuizLogic", () => {
  it("deve inicializar com valores padrão", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useQuizLogic());

    await waitForNextUpdate();

    expect(result.current.books.length).toBe(2);
    expect(result.current.count).toBeGreaterThanOrEqual(0);
    expect(result.current.points).toBe(0);
    expect(result.current.canStart).toBe(true);
    expect(result.current.needToRestart).toBe(false);
  });

  it("deve adicionar pontos corretamente", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useQuizLogic());

    await waitForNextUpdate();

    act(() => {
      result.current.addPoints();
    });

    expect(result.current.points).toBe(15);
  });

  it("deve reiniciar o jogo corretamente", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useQuizLogic());

    await waitForNextUpdate();

    act(() => {
      result.current.restartGame();
    });

    expect(result.current.needToRestart).toBe(true);
  });
});
