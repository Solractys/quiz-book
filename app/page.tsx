"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import QuizComponent from "./Components/QuizComponent";

function Home() {
  return (
    <main className="p-0  w-full flex items-center justify-center">
      <div className="absolute z-50 right-10 top-10 flex cursor-pointer gap-2">
        <SunIcon />
        <input
          type="checkbox"
          value="dracula"
          className="toggle theme-controller"
        />
        <MoonIcon />
      </div>
      <QuizComponent />
      <span className="absolute bottom-0">by Solractys</span>
    </main>
  );
}
export default Home;
