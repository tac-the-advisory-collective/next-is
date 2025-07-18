import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <h1 className="text-4xl">Next15 I.S.</h1>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <span
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-2xl font-bold italic"
        >
          Fork It
        </span>
        <span
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-2xl font-bold italic"
        >
          Improve It
        </span>
        <span
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-2xl font-bold italic"
        >
          Pull Request It
        </span>
      </footer>
    </div>
  );
}
