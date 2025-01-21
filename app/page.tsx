"use client";
import searchBooks from "./services/fetchBooks";
function Home() {
  return (
    <main>
      <div>
        <button
          className="bg-green-500 rounded-md py-1 px-3 text-white hover:bg-green-600"
          onClick={() => searchBooks()}
        >
          Start
        </button>
      </div>
    </main>
  );
}
export default Home;
