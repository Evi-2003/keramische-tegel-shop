import InspiratieCarousel from "./components/InspiratieCarousel.js";
import MostSold from "./components/MostSold.js";
import Link from "next/link";
import { PageWrapper } from "./components/pageWrapper.tsx";
import ReviewSlider from "./components/ReviewSlider.js";
import getPopulairProducts from "./data/getPopulairProducts.js";
import ProductZonderAfmeting from "./components/ProductZonderAfmeting";
import Product from "./components/Product";
import getProducts from "./data/products";

import binnen from "../public/categorieen/binnen.webp";
import daktuin from "../public/categorieen/daktuin.webp";
import oprit from "../public/categorieen/oprit.webp";
import buiten1 from "../public/inspiratie/1.webp";
import buiten2 from "../public/inspiratie/2.webp";
import buiten4 from "../public/inspiratie/4.webp";

import claessen from "../public/merken/claessen.webp";
import excluton from "../public/merken/excluton.svg";
import gardenlux from "../public/merken/gardenlux.webp";
import klijn from "../public/merken/klijn.webp";
import lightpro from "../public/merken/lightpro.svg";
import mbi from "../public/merken/mbi.webp";
import stonesenter from "../public/merken/stonesenter.webp";
import swaansbeton from "../public/merken/swaansbeton.webp";

import showroom from "../public/Showroom.jpeg";
import Image from "next/image";
import { Suspense } from "react";
export const metadata = {
  title: "Keramische Tegel Shop",
  description:
    "Keramische Tegel Shop heeft een groot assortiment aan keramische tegels. Wij hebben tegels voor binnen, buiten, dakterrassen, oprit en zwembad en meer. ",
};
export default async function Home() {
  const MostSoldProduct = await getPopulairProducts();
  const products = await getProducts();
  return (
    <>
      <PageWrapper className="text-slate-900 dark:text-slate-100 m-5 text-center py-5 space-y-3 w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-2/3 2xl:w-7/12 flex flex-col">
        <h1 className="text-3xl font-medium">
          Geniet van een moderne tuin, met keramische tegels.
        </h1>
        <section className="flex flex-col lg:grid grid-rows-2 md:grid-cols-5 md:grid-rows-3 space-x-0 md:space-x-5 md:h-[28rem] xl:h-[24rem] 2xl:h-[29rem] relative w-full">
          <section className="row-start-1 md:row-span-2 md:col-span-4">
            <InspiratieCarousel></InspiratieCarousel>
          </section>

          <article className="hidden row-start-2 w-5/6 md:w-fit md:row-start-auto md:col-start-5 md:col-span-full md:grid flex-col space-y-5 text-slate-950 text-center mt-5 md:mt-0 place-self-center md:place-self-auto">
            <span className="text-xl font-medium bg-[--primary] px-5 py-1 text-slate-50 self-center">
              Best verkocht
            </span>
            <Suspense fallback={<span>Best verkochte product laden....</span>}>
              <ProductZonderAfmeting
                product={MostSoldProduct}
              ></ProductZonderAfmeting>
            </Suspense>
          </article>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 grid-rows-auto gap-5">
          <Link
            href="shop?dikte=1cm"
            aria-label="Bekijk de Keramiek 1 cm, geschikt voor binnen"
            className="col-start-1 lg:row-start-1 flex flex-col text-black dark:text-slate-100 hover:scale-95"
          >
            <Image
              src={binnen}
              alt={"Afbeelding van keramiek 1 cm binnen"}
              width={300}
              quality="100"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
              height={300}
              loading="lazy"
              className="h-64 w-full object-cover rounded-lg shadow-sm hover:shadow-xl"
            />
            <h2 className="text-lg font-medium pt-3">Keramiek 1 cm</h2>
            <span>Geschikt voor binnen</span>
          </Link>

          <Link
            href="shop?dikte=2cm"
            aria-label="Bekijk de Keramiek 2 cm Geschikt voor binnen & dakterrassen"
            className="lg:col-start-2 lg:row-start-1 flex flex-col text-black dark:text-slate-100 hover:scale-95"
          >
            <Image
              src={daktuin}
              alt={"Afbeelding van keramiek 2cm dakterras"}
              width={300}
              quality="80"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
              height={300}
              loading="lazy"
              className="h-64 w-full object-cover rounded-lg shadow-sm hover:shadow-xl"
            />
            <h2 className="text-lg font-medium pt-3">Keramiek 2 cm</h2>
            <span>Geschikt voor binnen & dakterrassen</span>
          </Link>

          <Link
            href="shop?dikte=3cm"
            aria-label="Bekijk de Keramiek 3 cm Geschikt voor buiten"
            className="col-start-1 lg:row-start-2 flex flex-col text-black dark:text-slate-100 hover:scale-95"
          >
            <Image
              src={buiten1}
              alt={"Afbeelding van keramiek 3cm buiten"}
              width={300}
              quality="80"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
              loading="lazy"
              height={300}
              className="h-64 w-full object-cover rounded-lg shadow-sm hover:shadow-xl"
            />
            <h2 className="text-lg font-medium pt-3">Keramiek 3 cm</h2>
            <span>Geschikt voor buiten</span>
          </Link>

          <Link
            href="shop?dikte=4cm"
            aria-label="Bekijk de Keramiek 4 cm Geschikt voor buiten"
            className="lg:col-start-2 lg:row-start-2 flex flex-col text-black dark:text-slate-100 hover:scale-95"
          >
            <Image
              src={buiten2}
              alt={"Afbeelding van keramiek 4cm buiten"}
              width={300}
              quality="80"
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
              height={300}
              className="h-64 w-full object-cover rounded-lg shadow-sm hover:shadow-xl"
            />
            <h2 className="text-lg font-medium pt-3">Keramiek 4 cm</h2>
            <span>Geschikt voor buiten</span>
          </Link>

          <Link
            href="shop?dikte=5cm"
            aria-label="Bekijk de 
            Keramiek 5 cm Geschikt voor buiten"
            className="col-start-1 lg:row-start-3 flex flex-col text-black dark:text-slate-100 hover:scale-95"
          >
            <Image
              src={buiten4}
              alt={"Afbeelding van keramiek 5cm buiten"}
              width={300}
              quality="80"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
              loading="lazy"
              height={300}
              className="h-64 w-full object-cover rounded-lg shadow-sm hover:shadow-xl"
            />
            <h2 className="text-lg font-medium pt-3">Keramiek 5 cm</h2>
            <span>Geschikt voor buiten</span>
          </Link>

          <Link
            href="shop?dikte=6cm"
            aria-label="Bekijk de Keramiek 6 cm Geschikt voor oprit"
            className="lg:col-start-2 lg:row-start-3 flex flex-col text-black dark:text-slate-100 hover:scale-95"
          >
            <Image
              src={oprit}
              alt={"Afbeelding van keramiek 6cm oprit"}
              width={300}
              quality="80"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
              loading="lazy"
              height={300}
              className="h-64 w-full object-cover rounded-lg shadow-sm hover:shadow-xl"
            />
            <h2 className="text-lg font-medium pt-3">Keramiek 6 cm</h2>
            <span>Geschikt voor oprit</span>
          </Link>
        </section>

        <section className="flex flex-col md:grid md:grid-cols-4 gap-x-10 gap-y-5 mx-10">
          <h2 className="text-3xl font-medium row-start-1 col-span-full mb-3">
            Onze fabrikanten
          </h2>
          <Link
            href="/shop?"
            aria-label="Tegels van Claessen"
            className="col-start-1 row-start-3 flex flex-col text-black dark:text-slate-100 hover:scale-95"
          >
            <Image
              src={claessen}
              alt="Tegels van Claessen"
              width={300}
              quality="80"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
              loading="lazy"
              height={100}
              className="h-32 w-full object-contain rounded-lg shadow-sm hover:shadow-xl"
            />
            <h3 className="text-lg font-medium pt-3">Claessen</h3>
          </Link>
          <Link
            href="/shop?"
            aria-label="Tegels van Excluton"
            className="col-start-2 row-start-2 flex flex-col text-black dark:text-slate-100 hover:scale-95"
          >
            <figure className="h-32 flex justify-center items-center">
              <Image
                src={excluton}
                alt={"Tegels van Excluton"}
                width={300}
                quality="80"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
                loading="lazy"
                height={100}
                className="w-full object-contain rounded-lg shadow-sm hover:shadow-xl bg-black px-5 h-full"
              />
            </figure>
            <h3 className="text-lg font-medium pt-3">Excluton</h3>
          </Link>
          <Link
            href="/shop?"
            aria-label="Tegels van Gardenlux"
            className="col-start-3 row-start-2 flex flex-col text-black dark:text-slate-100 hover:scale-95"
          >
            <Image
              src={gardenlux}
              alt={"Tegels van Gardenlux"}
              width={300}
              quality="80"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
              loading="lazy"
              height={100}
              className="h-32 w-full object-contain rounded-lg shadow-sm bg-black px-5 hover:shadow-xl"
            />
            <h3 className="text-lg font-medium pt-3">Gardenlux</h3>
          </Link>
          <Link
            href="/shop?"
            aria-label="Tegels van Klijn"
            className="col-start-4 row-start-2 flex flex-col text-black dark:text-slate-100 hover:scale-95"
          >
            <Image
              src={klijn}
              alt="Tegels van Klijn"
              width={300}
              quality="80"
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
              height={100}
              className="h-32 w-full object-contain rounded-lg shadow-sm hover:shadow-xl bg-black px-5"
            />
            <h3 className="text-lg font-medium pt-3">Klijn</h3>
          </Link>
          <Link
            href="/shop?"
            aria-label="Tegels van LightPro"
            className="col-start-1 row-start-2 flex flex-col text-black dark:text-slate-100 hover:scale-95"
          >
            <figure className="h-32 flex justify-center items-center">
              <Image
                src={lightpro}
                alt={"Tegels van LightPro"}
                width={300}
                quality="80"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
                loading="lazy"
                height={100}
                className="w-full object-contain rounded-lg shadow-sm hover:shadow-xl bg-black px-5 py-10 h-fit"
              />
            </figure>
            <h3 className="text-lg font-medium pt-3">LightPro</h3>
          </Link>
          <Link
            href="/shop?"
            aria-label="Tegels van Mbi"
            className="col-start-2 row-start-3 flex flex-col text-black dark:text-slate-100 hover:scale-95"
          >
            <figure className="h-32 flex justify-center items-center">
              <Image
                src={mbi}
                alt={"Tegels van Mbi"}
                width={300}
                quality="50"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
                loading="lazy"
                height={100}
                className="w-full object-contain rounded-lg shadow-sm hover:shadow-xl px-5 py-4 h-32"
              />
            </figure>
            <h3 className="text-lg font-medium pt-3">MBI</h3>
          </Link>
          <Link
            href="/shop?"
            aria-label="Tegels van Stonesenter"
            className="col-start-3 row-start-3 flex flex-col text-black dark:text-slate-100 hover:scale-95"
          >
            <figure className="h-32 flex justify-center items-center">
              <Image
                src={stonesenter}
                alt={"Tegels van Stonesenter"}
                width={300}
                quality="50"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
                loading="lazy"
                height={100}
                className="w-full object-contain rounded-lg shadow-sm hover:shadow-xl px-5 py-10 h-32"
              />
            </figure>
            <h3 className="text-lg font-medium pt-3">StonesEnter</h3>
          </Link>

          <Link
            href="/shop?"
            aria-label="Tegels van Swaansbeton"
            className="col-start-4 row-start-3 flex flex-col text-black dark:text-slate-100 hover:scale-95"
          >
            <figure className="h-32 flex justify-center items-center">
              <Image
                src={swaansbeton}
                alt={"Tegels van Swaansbeton"}
                width={300}
                quality="50"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
                loading="lazy"
                height={100}
                className="w-full object-contain rounded-lg shadow-sm bg-white hover:shadow-xl px-5 py-4 h-32"
              />
            </figure>
            <h3 className="text-lg font-medium pt-3">Swaansbeton</h3>
          </Link>
        </section>

        <section className="grid grid-col-1 md:grid-cols-2 pb-3 pt-7">
          <Image
            src={showroom}
            alt={"Onze showroom in Wageningen"}
            width={500}
            quality="20"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
            height={300}
            loading="lazy"
            className="w-fit object-contain h-72 rounded-lg col-start-1 row-start-2md:row-start-1"
          />
          <article className="row-start-2 md:row-start-1 col-start-1 md:col-start-2 text-left md:mx-5">
            <h2 className="text-2xl mb-3 lg:text-3xl font-medium -mt-5 md:-mt-0">
              Showroom
            </h2>
            <table class="table-auto w-full text-center">
              <thead>
                <tr className="border">
                  <th class="w-1/6 px-2 py-1">Ma</th>
                  <th class="w-1/6 px-2 py-1">Di</th>
                  <th class="w-1/6 px-2 py-1">Wo</th>
                  <th class="w-1/6 px-2 py-1">Do</th>
                  <th class="w-1/6 px-2 py-1">Vr</th>
                  <th class="w-1/6 px-2 py-1">Za</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-sm">
                  <td class="border px-2 py-1">09:00 t/m 17:00</td>
                  <td class="border px-2 py-1">09:00 t/m 17:00</td>
                  <td class="border px-2 py-1">09:00 t/m 17:00</td>
                  <td class="border px-2 py-1">09:00 t/m 14:30</td>
                  <td class="border px-2 py-1">09:00 t/m 17:00</td>
                  <td class="border px-2 py-1">09:00 t/m 13:00</td>
                </tr>
              </tbody>
            </table>

            <ul className="mt-1">
              <li className="hover:underline hover:scale-95">
                <a
                  href="tel:0317765005"
                  aria-label="Bellen naar Keramische Tegel Shop"
                  className="hover:underline"
                >
                  <b>Tel</b>
                  <br aria-hidden="true"></br>0317 765 005
                </a>
              </li>
              <li className="hover:underline hover:scale-95">
                <Link
                  href="https://maps.app.goo.gl/dfEmEZo1ntC5vVpn8"
                  aria-label="Routebeschrijving naar de showroom van Keramische Tegel Shop"
                  className="hover:scale-95 hover:underline"
                  target="_blank"
                >
                  <b>Adres</b>
                  <br aria-hidden="true"></br>Nudepark 93
                  <br aria-hidden="true"></br> 6702 DZ Wageningen
                </Link>
              </li>
              <li className="hover:underline hover:scale-95">
                <a
                  href="email:info@keramischetegelshop.nl"
                  aria-label="Stuur een mail"
                >
                  <b>Email</b>
                  <br aria-hidden="true"></br>info@keramischetegelshop.nl
                </a>
              </li>
            </ul>
          </article>
        </section>
      </PageWrapper>
    </>
  );
}
