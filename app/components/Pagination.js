"use client";
import { redirect } from "next/navigation";
import Link from "next/link";
import optionsUrl from ".//serverActionUrl";
export default function Pagination({ searchparams, maxProducten }) {
  const maxProductenPerPagina = 24;
  const maxPagina = maxProducten / maxProductenPerPagina;
  console.log(maxPagina);
  // is 8.33
  let huidigePagina = searchparams.pagina || 1;
  function redirectToNextPage(welkePagina) {
    optionsUrl("http://", "shop", "", "pagina", welkePagina, "push");
  }
  return (
    <>
      <section className="flex gap-x-3 row-start-2 col-span-full justify-center">
        {Number(huidigePagina) - 3 >= 1 && (
          <Link
            className="border dark:text-slate-100 text-slate-950 w-10 h-10 rounded-lg font-bold hover:scale-90 hover:border-[--primary] flex justify-center items-center"
            href={`/shop/?pagina=${Number(huidigePagina) - 3}`}
          >
            {Number(huidigePagina) - 3}
          </Link>
        )}
        {Number(huidigePagina) - 2 >= 1 && (
          <Link
            className="border dark:text-slate-100 text-slate-950 w-10 h-10 rounded-lg font-bold hover:scale-90 hover:border-[--primary] flex justify-center items-center"
            href={`/shop/?pagina=${Number(huidigePagina) - 2}`}
          >
            {Number(huidigePagina) - 2}
          </Link>
        )}
        {Number(huidigePagina) - 1 >= 1 && (
          <Link
            className="border dark:text-slate-100 text-slate-950 w-10 h-10 rounded-lg font-bold hover:scale-90 hover:border-[--primary] flex justify-center items-center"
            href={`/shop/?pagina=${Number(huidigePagina) - 1}`}
          >
            {Number(huidigePagina) - 1}
          </Link>
        )}
        <span className="border-slate-950 dark:border-slate-100 border-4 dark:text-slate-100 text-slate-950 w-10 h-10 rounded-lg font-bold flex justify-center items-center">
          {Number(huidigePagina)}
        </span>
        {Number(huidigePagina) + 1 <= maxPagina && (
          <Link
            aria-label={`Ga naar pagina ${Number(huidigePagina) + 1}`}
            className="flex justify-center items-center border dark:text-slate-100 text-slate-950 w-10 h-10 rounded-lg font-bold hover:scale-90 hover:border-[--primary]"
            href={`/shop?pagina=${Number(huidigePagina) + 1}`}
          >
            {Number(huidigePagina) + 1}
          </Link>
        )}

        {Number(huidigePagina) + 2 <= maxPagina && (
          <Link
            className="flex justify-center items-center border dark:text-slate-100 text-slate-950 w-10 h-10 rounded-lg font-bold hover:scale-90 hover:border-[--primary]"
            aria-label={`Ga naar pagina ${Number(huidigePagina) + 2}`}
            href={`/shop?pagina=${Number(huidigePagina) + 2}`}
          >
            {Number(huidigePagina) + 2}
          </Link>
        )}
        {Number(huidigePagina) + 3 <= maxPagina && (
          <Link
            className="flex justify-center items-center border dark:text-slate-100 text-slate-950 w-10 h-10 rounded-lg font-bold hover:scale-90 hover:border-[--primary]"
            aria-label={`Ga naar pagina ${Number(huidigePagina) + 3}`}
            href={`/shop?pagina=${Number(huidigePagina) + 3}`}
          >
            {Number(huidigePagina) + 3}
          </Link>
        )}
      </section>
    </>
  );
}
