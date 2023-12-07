"use client";
import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart";
import Image from "next/image";
import CheckMarkGreen from ".//components/CheckMark";
import logo from "../public/logo.png";
import optionsUrl from ".//components/serverActionUrl";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useState } from "react";
export default function Header() {
  const [hover, setHover] = useState(false);
  const searchParams = useSearchParams();
  const zoekTerm = searchParams.get("zoeken");
  const params = new URLSearchParams(searchParams);
  function search(opdracht) {
    const zoekOpdracht = opdracht.get("zoeken");
    if (zoekOpdracht != undefined) {
      optionsUrl("https://headless-wp-react-webshop.vercel.app/shop", "", "zoeken", zoekOpdracht);
    }
  }
  return (
    <>
      <section className="bg-slate-100 w-full flex justify-center font-medium text-sm">
        <nav className="w-full lg:w-4/5 2xl:w-3/5 py-2 text-slate-950 flex justify-between">
          <ul className="w-full flex mx-5 space-x-5 lg:mx-0 lg:space-x-10 justify-center text-xs">
            <li className="flex">
              <CheckMarkGreen />{" "}
              <a
                href="https://maps.app.goo.gl/FYbZueE6XBV4nC6x7"
                target="_blank"
                aria-label="Open de routebeschrijving naar Nudetuin / Keramische tegel shop"
                className="hover:underline opacity-80"
              >
                Grote showtuin
              </a>
            </li>
            <li className="hidden lg:flex opacity-80">
              <CheckMarkGreen /> Complete tuininrichting
            </li>
            <li className="hidden lg:flex opacity-80">
              <CheckMarkGreen /> Verkoop, aanleg en montage
            </li>
            <li className="flex opacity-80">
              <CheckMarkGreen />{" "}
              <span className="hidden lg:flex">Direct contact:</span>
              <a
                href="tel:0317 765 005"
                aria-label="Bel Keramische Tegel Shop"
                className="hover:underline"
              >
                &nbsp;0317 765 005
              </a>
            </li>
          </ul>
        </nav>
      </section>
      <header className="bg-[--wit] text-[--menu-tekst] h-fit w-full flex flex-col justify-center items-center sticky top-0 z-50">
        <nav className="lg:w-5/6 xl:w-5/6 2xl:w-4/6 grid grid-cols-3 space-between justify-items-center lg:justify-items-start lg:items-center py-1">
          <Link
            href="/"
            aria-label="Ga terug naar Home"
            className="col-span-full w-full lg:col-start-1 lg:col-span-1"
          >
            <Image
              src={logo}
              width={450}
              height={100}
              alt="Logo van Keramische Tegel Shop"
              priority
            ></Image>
          </Link>
          <form
            action={search}
            className="w-5/6 col-span-full row-start-1 lg:col-start-2 lg:w-5/6 flex flex-col relative lg:justify-self-center"
          >
            <label htmlFor="zoeken" className="text-lg">
              Waar ben je naar opzoek?
            </label>
            <input
              id="zoekVeld"
              name="zoeken"
              type="text"
              placeholder="Bijvoorbeeld: Cera3line"
              className="shadow-md bg-slate-100 hover:bg-slate-50 rounded-lg py-1 px-4 lg:py-2 lg:px-5 text-sm lg:text-base hover:shadow-lg"
              defaultValue={zoekTerm ? zoekTerm : undefined}
            />
            <button
              aria-label="Zoeken"
              className="hover:shadow-xl hover:scale-95 bg-[--primary] text-white w-fit py-[0.8%] px-4 lg:py-2 lg:px-5 rounded-lg absolute right-0 bottom-0 font-semibold"
            >
              Zoeken
            </button>
          </form>

          <iframe
            frameborder="no"
            title="Bekijk onze reviews via 5sterrenspecialist.nl"
            allowtransparency=""
            className="col-start-4 row-start-1 overflow-hidden box-border w-[310px] h-[60px]"
            src="https://www.5sterrenspecialist.nl/widget.html?hash=43db16322af3ee96ea945c67bd694b71&type=reviews&webshop-or-regular=regular&logo-position=right&size=small&logo-color=black&background=transparent&border=1"
          ></iframe>
        </nav>
        <section className="flex bg-slate-50 text-sky-950 w-full items-center text-center justify-center py-1 shadow-sm transform hover:transition-all duration-200">
          <nav onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)} className="lg:w-2/4 xl:w-3/6 2xl:w-3/5 grid lg:gap-x-10 justify-center items-center justify-items-center py-1 px-10 transform transition-all duration-200" style={{ height: hover ? "auto" : "50px", overflow: "hidden" }}>
            <Link href="/" aria-label="Ga naar de startpagina" className="col-start-1 row-start-1 font-semibold grid-auto-cols-auto hover:underline">Home</Link>
            <span className="col-start-2 row-start-1 font-semibold">Fabrikanten</span>
            {hover && <>
            <hr className="bg-[--primary] h-[2px] w-1/2 col-start-2 row-start-2"></hr>
            <ul className="col-start-2 row-start-3 mt-3 h-full">
              <li>MBI</li>
              <li>Gardenlux</li>
            </ul>
            </>}

            <Link href="/shop" aria-label="Bekijk onze assortiment" className="col-start-3 row-start-1 font-semibold hover:underline grid-auto-cols-auto">Assortiment</Link>
            {hover && <>
            <hr className="bg-[--primary] h-[2px] w-1/2 col-start-3 row-start-2 "></hr>
            <ul className="col-start-3 row-start-3 mt-3 h-full">
              <li>Keramische tegels Huis</li>
              <li>Keramische tegels Tuin</li>
            </ul>
            </>}

            <Link href="/klantenservice" aria-label="Ga naar de klantenservice" className="col-start-4 row-start-1 font-semibold grid-auto-cols-auto hover:scale-95 hover:underline">Klantenservice</Link>
            {hover && <>
            <hr className="bg-[--primary] h-[2px] w-1/2 col-start-4 row-start-2"></hr>
            <ul className="col-start-4 row-start-3 mt-3 justify-start h-full">
              <li>Contact</li>
              <li>Showroom</li>
            </ul>
            </>}

            <Link
              href="/winkelmand"
              aria-label="Ga naar je winkelmand"
              className="flex items-center row-start-1 col-start-5 bg-[--primary] text-slate-100 w-fit justify-self-center px-4 py-2 rounded-lg shadow-xl hover:scale-95 text-base font-medium ml-5"
            >
              <svg
                className="fill-slate-100 lg:mr-2"
                height="24"
                viewBox="0 0 16 16"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 1V3H2.15287L2.98347 7.98361L2.01942 12.8039C2.00612 12.8704 1.99972 12.9375 2 13.0041C2.00141 13.3451 2 13.6507 2 14C2 15.1046 2.89543 16 4 16C5.10457 16 6 15.1046 6 14H10C10 15.1046 10.8954 16 12 16C13.1046 16 14 15.1046 14 14C14 12.8954 13.1046 12 12 12H4.2198L4.6198 10H15V1H0Z" />
              </svg>
              <span className="hidden lg:flex">Winkelmand</span>
            </Link>
          </nav>
        </section>
      </header>
    </>
  );
}
