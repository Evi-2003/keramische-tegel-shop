"use server";
import Link from "next/link";
import Image from "next/image";
import getProducts from "../data/products";
import Product from "../components/Product";
import FilterBar from "../components/FilterBar";
import { PageWrapper } from "../components/pageWrapper.tsx";
import { useSearchParams } from "next/navigation";
import { use } from "react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Pagination from "../components/Pagination.js";
export default async function ProductFeed({ searchParams }) {
  let hoeveelProducten = 1;
  let huidigePagina = searchParams.pagina || 0;
  let aantalPerPagina = 24;
  const products = await getProducts(
    searchParams.afmetingen,
    searchParams.zoeken,
    searchParams.categorie
  );

  let start = huidigePagina;
  let eind = start * huidigePagina + aantalPerPagina;
  let productPagination = products.slice(start, eind);
  function removeHtmlTags(str) {
    str = str.replace(/<[^>]*>/g, "");
    str = str.replace("€&nbsp;", "");
    return str;
  }
  return (
    <>
      {products.length >= 1 ? (
        <span className="hidden md:block border-2 border-solid border-slate-300 dark:text-slate-100 col-span-full row-start-2 text-slate-900 py-1 px-5 rounded-lg w-fit h-fit text-base justify-self-center">
          {products.length} resultaten gevonden
        </span>
      ) : (
        <span className="hidden md:block border-2 border-solid border-slate-300 dark:text-slate-100  col-span-full text-slate-900 py-1 px-5 rounded-lg w-fit h-fit text-base justify-self-center">
          Geen resultaten gevonden
        </span>
      )}
      <section className="col-span-full md:col-start-2 mt-5 grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-y-5 gap-x-5 m-5">
        {productPagination.map((product, index) => (
          <Suspense key={product.id} fallback={<span>Producten ophalen</span>}>
            <Product product={product} afmeting={searchParams.afmetingen} />
          </Suspense>
        ))}
      </section>
      <section className="col-span-full md:col-start-1">
        <Suspense fallback={<span>Filters ophalen</span>}>
          <Pagination
            searchparams={searchParams}
            maxProducten={products.length}
          />
        </Suspense>
      </section>
    </>
  );
}
