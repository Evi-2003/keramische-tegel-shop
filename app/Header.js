"use client";
import Link from "next/link";
import Image from "next/image";
import CheckMarkGreen from ".//components/CheckMark";
import logo from "../public/logo.png";
import optionsUrl from ".//components/serverActionUrl";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchParams = useSearchParams();
  const zoekTerm = searchParams.get("zoeken");

  function search(opdracht) {
    const zoekOpdracht = opdracht.get("zoeken");
    if (zoekOpdracht != undefined) {
      optionsUrl("http://", "shop", "", "zoeken", zoekOpdracht);
    }
  }

  /* Darkmode */
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => {
    if (document.body.classList.contains("dark")) {
      document.body.classList.remove("dark");
      setIsDarkMode(false);
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.add("dark");
      setIsDarkMode(true);
      localStorage.setItem("theme", "dark");
    }
  };

  useEffect(() => {
    const darkMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const lightMediaQuery = window.matchMedia("(prefers-color-scheme: light)");

    const checkNightTime = () => {
      const now = new Date();
      return now.getHours() > 18 || now.getHours() < 6;
    };

    const updateTheme = () => {
      if (darkMediaQuery.matches) {
        document.body.classList.add("dark");
        setIsDarkMode(true);
      } else if (
        lightMediaQuery.matches ||
        (!darkMediaQuery.matches && !checkNightTime())
      ) {
        document.body.classList.remove("dark");
        setIsDarkMode(false);
      } else if (
        !darkMediaQuery.matches &&
        !lightMediaQuery.matches &&
        checkNightTime()
      ) {
        document.body.classList.add("dark");
        setIsDarkMode(true);
      }
    };
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      setIsDarkMode(true);
    }
    if (savedTheme === "light") {
      document.body.classList.remove("dark");
      setIsDarkMode(false);
    }
    if (!(savedTheme === "dark" || savedTheme === "light")) {
      updateTheme();
    }

    // Listen for changes in the OS preferred color scheme
    darkMediaQuery.addEventListener("change", updateTheme);
    lightMediaQuery.addEventListener("change", updateTheme);

    // Cleanup listener on unmount
    return () => {
      darkMediaQuery.removeEventListener("change", updateTheme);
      lightMediaQuery.removeEventListener("change", updateTheme);
    };
  }, []);
  return (
    <>
      <header className="bg-[--wit] dark:bg-[#0D0D0D] text-[--menu-tekst] dark:text-slate-100 h-fit w-full flex flex-col justify-center items-center md:sticky top-0 z-50">
        {/*<section className=" dark:bg-slate-950 dark:text-slate-50 w-full text-center py-2 md:sticky top-0">
          <span className="font-semibold">
            Fijne feestdagen! <br aria-hidden="true" className="md:hidden"></br>
            De showroom is gesloten op eerste kerstdag!
          </span>
  </section>*/}
        <section className="bg-slate-50 dark:bg-black w-full flex justify-center font-medium text-sm">
          <nav className="w-full md:w-4/5 2xl:w-3/5 py-2 dark:text-slate-100 flex justify-between">
            <ul className="w-full flex mx-5 space-x-5 md:mx-0 md:space-x-10 justify-center text-xs">
              <li className="flex">
                <CheckMarkGreen />{" "}
                <a
                  href="https://maps.app.goo.gl/FYbZueE6XBV4nC6x7"
                  target="_blank"
                  aria-label="Grote Showtuin - Open de routebeschrijving naar Nudetuin / Keramische tegel shop"
                  class="hover:underline opacity-80"
                >
                  Grote Showtuin
                </a>
              </li>
              <li className="hidden md:flex opacity-80">
                <CheckMarkGreen /> Complete tuininrichting
              </li>
              <li className="hidden md:flex opacity-80">
                <CheckMarkGreen /> Verkoop, aanleg en montage
              </li>
              <li className="flex opacity-80">
                <CheckMarkGreen />{" "}
                <span className="hidden md:flex">Direct contact:</span>
                <a
                  href="tel:0317 765 005"
                  aria-label="Bel Keramische Tegel Shop op 0317 765 005"
                  className="hover:underline"
                >
                  &nbsp;0317 765 005
                </a>
              </li>
              <li>
                <button onClick={toggleTheme} className="font-bold">
                  Thema:
                  {isDarkMode ? " Donker" : " Licht"}
                </button>
              </li>
            </ul>
          </nav>
        </section>
        <nav className="w-full md:w-5/6 lg:w-9/12 2xl:w-7/12 grid grid-cols-3 space-between justify-items-center md:justify-items-start md:items-center py-2">
          <Link
            href="/"
            aria-label="Ga terug naar Home"
            className="col-start-1 col-span-3 w-full md:col-start-1 row-start-1 md:col-span-1 px-3 flex justify-center"
          >
            <Image
              src={logo}
              width={300}
              height={100}
              alt="Logo van Keramische Tegel Shop"
              priority
              className="bg-white dark:bg-white rounded-lg w-2/3 md:w-full"
            ></Image>
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="col-start-3 row-start-1 place-self-center md:hidden border items-center justify-self-end justify-center flex w-10 h-10 mr-5 fill-[--primary] border-[--primary] dark:border-slate-100 dark:fill-slate-50 rounded-lg"
          >
            <svg
              className="w-7 h-7"
              version="1.1"
              viewBox="0 0 1200 1200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m88.891 288.89h1022.2c49.09 0 88.891-39.82 88.891-88.891 0-49.133-39.754-88.891-88.844-88.891h-1022.3c-49.07 0-88.891 39.758-88.891 88.891 0 49.066 39.82 88.891 88.891 88.891zm1022.2 222.2h-1022.2c-49.09 0-88.891 39.801-88.891 88.91 0 49.09 39.82 88.891 88.891 88.891h1022.2c49.09 0 88.891-39.801 88.891-88.891-0.003906-49.109-39.805-88.91-88.895-88.91zm0 400h-1022.2c-49.09 0-88.891 39.801-88.891 88.934 0 49.09 39.82 88.891 88.891 88.891h1022.2c49.09 0 88.891-39.801 88.891-88.891-0.003906-49.133-39.805-88.934-88.895-88.934z" />
            </svg>
          </button>
          <form
            action={search}
            className="w-5/6 col-span-full row-start-2 mt-2 md:mt-0 md:row-start-1 md:col-start-2 md:w-5/6 flex flex-col relative md:justify-self-center"
          >
            <label htmlFor="zoeken" className="text-lg">
              Waar ben je naar opzoek?
            </label>
            <input
              id="zoekVeld"
              name="zoeken"
              type="text"
              placeholder="Bijvoorbeeld: Cera3line"
              className="shadow-md border h-10 bg-transparent dark:text-slate-50 rounded-lg px-4 md:px-5 text-sm md:text-base hover:shadow-lg"
              defaultValue={zoekTerm ? zoekTerm : undefined}
            />
            <button
              aria-label="Zoeken"
              className="hover:shadow-xl h-10 hover:scale-95 bg-[--primary] text-white w-fit py-[0.8%] px-4 md:px-5 rounded-r-lg border absolute right-0 bottom-0 font-semibold"
            >
              Zoeken
            </button>
          </form>
          <iframe
            frameborder="no"
            title="Bekijk onze reviews via 5sterrenspecialist.nl"
            allowtransparency=""
            className="hidden lg:block col-start-4 row-start-1 overflow-hidden box-border w-[310px] h-[60px] bg-white rounded-md"
            src="https://www.5sterrenspecialist.nl/widget.html?hash=43db16322af3ee96ea945c67bd694b71&type=reviews&webshop-or-regular=regular&logo-position=right&size=small&logo-color=black&background=transparent&border=1"
          ></iframe>
        </nav>

        <section
          className={`py-1 flex-col md:flex-row dark:bg-black dark:text-slate-100 text-sky-950 w-full items-center text-center justify-center shadow-sm transform hover:transition-all duration-200 ${
            isMenuOpen ? "flex" : "hidden md:flex"
          }`}
        >
          <nav className="z-50 md:w-2/4 xl:w-3/6 2xl:w-3/5 grid md:gap-x-10 justify-center items-start py-1 px-10 transform transition-all duration-200">
            <ul className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 items-center justify-center gap-x-5">
              <li className="font-semibold hover:underline">
                <Link
                  href="/"
                  aria-label="Ga naar Home"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li className="group font-semibold hover:underline">
                <Link
                  href="/shop"
                  aria-label="Bekijk onze assortiment"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Assortiment
                </Link>
              </li>
              <li className="group font-semibold hover:underline">
                <Link
                  href="/over-ons"
                  aria-label="Bekijk onze over ons"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Over Ons
                </Link>
              </li>
              <li className="group font-semibold hover:scale-95 hover:underline">
                <Link
                  href="/klantenservice"
                  aria-label="Ga naar de klantenservice"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Klantenservice
                </Link>
              </li>
              <li className="flex items-center bg-[--primary] text-slate-100 w-fit h-fit justify-self-center px-3 py-1 rounded-lg shadow-xl hover:scale-95 text-base font-medium">
                <Link
                  href="/winkelmand"
                  aria-label="Ga naar je winkelmand"
                  className="w-fit h-fit flex justify-center items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg
                    className="fill-slate-100 md:mr-2"
                    height="28"
                    version="1.1"
                    viewBox="0 0 1200 1200"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m92.25 144c-9.5508 0.49609-18.512 4.7656-24.91 11.867-6.4023 7.1055-9.7188 16.461-9.2227 26.008 0.5 9.5508 4.7695 18.508 11.875 24.91 7.1016 6.3984 16.461 9.7148 26.008 9.2148h116.25l148.88 549.38c2.0664 7.6602 6.6055 14.426 12.914 19.238 6.3047 4.8164 14.027 7.4102 21.961 7.3867h588c9.6367 0.13672 18.926-3.5977 25.785-10.363 6.8633-6.7656 10.727-16 10.727-25.637s-3.8633-18.871-10.727-25.637c-6.8594-6.7656-16.148-10.5-25.785-10.363h-560.25l-13.125-48h597.38c7.8867 0.046875 15.57-2.4961 21.871-7.2383 6.2969-4.7422 10.867-11.422 13.004-19.012l96-348c3.0625-10.887 0.82812-22.578-6.0273-31.574-6.8555-8.9922-17.539-14.242-28.848-14.176h-807l-22.125-81.375c-2.0664-7.6602-6.6055-14.426-12.914-19.238-6.3047-4.8164-14.027-7.4102-21.961-7.3867h-144c-1.25-0.066406-2.5-0.066406-3.75 0zm224.25 180h739.88l-76.125 276h-589.12zm175.5 516c-59.219 0-108 48.781-108 108s48.781 108 108 108 108-48.781 108-108-48.781-108-108-108zm408 0c-59.219 0-108 48.781-108 108s48.781 108 108 108 108-48.781 108-108-48.781-108-108-108zm-408 72c20.309 0 36 15.691 36 36s-15.691 36-36 36-36-15.691-36-36 15.691-36 36-36zm408 0c20.309 0 36 15.691 36 36s-15.691 36-36 36-36-15.691-36-36 15.691-36 36-36z" />
                  </svg>
                  <span className="hidden md:flex place-self-center font-semibold">
                    Winkelmand
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </section>
      </header>
    </>
  );
}
