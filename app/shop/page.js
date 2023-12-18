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
import Pagination from "../components/Pagination";
import ProductFeed from "../components/ProductFeed";
import ProductSkeleton from "../components/ProductSkeleton";
export default function page({ searchParams }) {
  return (
    <>
      <PageWrapper className="lg:w-4/5 2xl:w-4/6 text-center grid grid-cols-4 my-10">
        <h1 className="text-3xl text-slate-900 font-bold dark:text-slate-100 row-start-1 col-span-full md:b-1">
          Shop
        </h1>
        <aside className="col-span-full mx-5 py-0 my-0 md:col-span-1 text-slate-950 dark:text-slate-100 rounded-lg md:py-5 flex flex-col items-center sticky">
          <FilterBar searchParams={searchParams} />
        </aside>

        <Suspense fallback={<ProductSkeleton />}>
          <ProductFeed searchParams={searchParams} />
        </Suspense>
      </PageWrapper>
    </>
  );
}
