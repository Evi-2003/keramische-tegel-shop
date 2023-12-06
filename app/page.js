"use client";
import InspiratieCarousel from "./components/InspiratieCarousel.js";
import MostSold from "./components/MostSold.js";
import { PageWrapper } from "./components/pageWrapper.tsx";

export default function Home() {
  return (
      <PageWrapper className="text-slate-900 dark:text-slate-100 m-5 text-center py-5 space-y-3 w-4/5 ">
        <h1 className="text-3xl font-semibold">
          Geniet van een moderne tuin, met keramische tegels.
        </h1>
        <section className="grid grid-cols-3 grid-rows-3 space-x-5 h-96 relative">
          <div className="row-start-1 row-span-3 col-start-1 col-span-2 flex flex-row w-full">
            <span className="absolute bottom-0 left-0 z-10 bg-slate-50 text-slate-950 px-5 py-1 m-5 shadow-xl">
              <h2 className="text-xl font-medium">Inspiratie</h2>
            </span>
            <InspiratieCarousel></InspiratieCarousel>
          </div>

          <article className="col-start-3 row-span-3 h-full w-full  text-slate-950 text-center flex justify-center items-center flex-col">
            <h2 className="text-xl font-medium bg-[--primary] px-5 py-1 text-slate-50 mb-5">
              Best verkocht
            </h2>
            <MostSold></MostSold>
          </article>
        </section>
      </PageWrapper>
   
  );
}
