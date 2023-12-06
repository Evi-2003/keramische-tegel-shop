import Link from "next/link";
import Image from "next/image";
import getProducts from "../data/products";
import Product from "../components/Product";
import FilterBar from "../components/FilterBar";
import { PageWrapper } from "../components/pageWrapper.tsx";

export default async function page({ searchParams }) {
  let hoeveelProducten = 1;
  const products = await getProducts(
    searchParams.afmetingen,
    searchParams.zoeken
  );

  function removeHtmlTags(str) {
    str = str.replace(/<[^>]*>/g, "");
    str = str.replace("€&nbsp;", "");
    return str;
  }

  return (
    <>
        <PageWrapper className="lg:w-4/5 text-white text-center grid grid-cols-5 my-10">
          <h1 className="text-3xl text-slate-900 font-bold dark:text-slate-100 row-start-1 col-span-full mb-1">
            Shop
          </h1>
          {products.length >= 1 ? (
            <span className="border-2 border-solid border-slate-300  col-span-full text-slate-900 py-1 px-5 rounded-lg w-fit h-fit text-base justify-self-center">
              {products.length} resultaten gevonden
            </span>
          ) : (
            <span className="border-2 border-solid border-slate-300  col-span-full text-skate-900 py-3 px-5 rounded-lg w-fit h-fit text-xl justify-self-center">
              Geen resultaten gevonden
            </span>
          )}
          <aside className="mt-5 col-start-1 text-slate-950 rounded-lg py-5 flex flex-col items-center sticky">
            <span className="text-2xl">Filters</span>
            <FilterBar />
          </aside>
          <section className="col-start-2 col-span-full ">
            <section className="mt-5 grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-y-5 gap-x-5 m-5">
              {products.map((product, index) => (
                <Product
                  product={product}
                  key={product.id}
                  afmeting={searchParams.afmetingen}
                />
              ))}
            </section>
          </section>
        </PageWrapper>

    </>
  );
}
