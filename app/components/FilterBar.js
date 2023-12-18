"use client";
import { usePathname, useSearchParams } from "next/navigation";
import getFilters from "../data/getFilters";
import Creatable from "react-select";
import {
  Select as NextSelect,
  Button,
  Slider,
  Spacer,
} from "@nextui-org/react";
import { useEffect } from "react";
import { useState } from "react";

export default function FilterBar() {
  const [showFilters, setShowFilters] = useState(false);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const pathname = usePathname();
  const sendFilters = () => {
    const formdata = new FormData();
    for (const [key, value] of params) {
      formdata.append(key, value);
    }
    getFilters(formdata, pathname, searchParams.toString());
  };
  const handleSelectChange =
    (key, isCheckbox = false) =>
    (event) => {
      if (isCheckbox) {
        params.delete(key);

        const checkboxContainer = event.target.parentElement.parentElement;

        const checkboxes = checkboxContainer.querySelectorAll(`[name=${key}]`);

        for (let checkbox of checkboxes) {
          if (checkbox.checked) {
            params.append(key, checkbox.value);
          }
        }
      } else {
        if (event) {
          params.set(key, event.value);
        } else {
          params.delete(key);
        }
      }
      sendFilters();
    };

  useEffect(() => {
    if (!searchParams.toString()) {
      const checkboxes = document.querySelectorAll("input[type=checkbox]");

      for (let checkbox of checkboxes) {
        checkbox.checked = false;
      }
    }
  }, [searchParams]);

  const options = [
    { value: "100x100x4cm", label: "100 x 100 x 4cm" },
    { value: "120x120x2cm", label: "120 x 120 x 2cm" },
    { value: "20x40x5cm", label: "20 x 40 x 5cm" },
    { value: "30x120x2cm", label: "30 x 120 x 2cm" },
    { value: "40x80x4cm", label: "40 x 80 x 4cm" },
    { value: "45x90x3cm", label: "45 x 90 x 3cm" },
    { value: "595x595x2cm", label: "59.5 x 59.5 x 2cm" },
    { value: "595x595x3cm", label: "59.5 x 59.5 x 3cm" },
    { value: "60x120x2cm", label: "60 x 120 x 2cm" },
    { value: "60x60x2cm", label: "60 x 60 x 2cm" },
    { value: "60x60x3cm", label: "60 x 60 x 3cm" },
    { value: "60x60x4cm", label: "60 x 60 x 4cm" },
    { value: "60x60x5cm", label: "60 x 60 x 5cm" },
    { value: "70x70x32cm", label: "70 x 70 x 3,2cm" },
    { value: "80x80x2cm", label: "80 x 80 x 2cm" },
    { value: "80x80x3cm", label: "80 x 80 x 3cm" },
    { value: "80x80x4cm", label: "80 x 80 x 4cm" },
    { value: "90x90x3cm", label: "90 x 90 x 3cm" },
  ];
  const categorieën = [
    { value: "binnen-tegels", label: "Tegels Binnen" },
    { value: "buiten-tegels", label: "Tegels Buiten" },
    { value: "oprit-tegels", label: "Tegels Oprit" },
    { value: "terras-tegels", label: "Tegels Dakterras" },
  ];
  const diktes = ["1cm", "2cm", "3cm", "4cm", "5cm"];
  const dikteInputs = diktes.map((dikte) => (
    <div className="flex items-center" key={dikte}>
      <input
        className="col-start-1 rounded mr-2"
        type="checkbox"
        value={dikte}
        name="dikte"
        id={dikte}
        onChange={handleSelectChange("dikte", true)}
      />
      <label className="w-fit col-start-2" htmlFor={dikte}>
        {dikte}
      </label>
    </div>
  ));
  return (
    <form
      action={sendFilters}
      className={`flex w-full items-center h-fit flex-col text-gray-800 dark:text-slate-100 sm:space-y-4 md:p-5 ${
        showFilters ? "border shadow-lg rounded-lg p-5" : ""
      } sm:border sm:shadow-lg sm:rounded-lg w-full
  `}
    >
      <button
        className="md:hidden md:mb-2 text-xl bg-[--primary] py-1 w-fit px-5 text-white font-medium mb-2 rounded-lg "
        onClick={(e) => {
          e.preventDefault();
          setShowFilters(!showFilters);
        }}
      >
        {showFilters ? "Verberg filters" : "Toon filters"}
      </button>

      <section
        className={`transition-all duration-500 overflow-hidden ${
          showFilters || window.innerWidth >= 768
            ? "block w-4/6 md:w-full md:space-y-3"
            : "hidden"
        }`}
      >
        <section>
          <span className="text-2xl">Filters</span>
          <hr className="my-3" />
          <h2 className="text-lg font-semibold md:mb-1">Categorieën</h2>
          <Creatable
            isClearable
            options={categorieën}
            className="mt-2 text-base text-slate-950"
            placeholder="Categorieën"
            name="categorie"
            onChange={handleSelectChange("categorie")}
          />
        </section>
        <section className="mb-5">
          <h2 className="text-lg font-semibold md:mb-1">
            <label htmlFor="afmetingen">Afmetingen</label>
          </h2>
          <Creatable
            isClearable
            options={options}
            className="mt-2 text-base text-slate-950"
            placeholder="Afmetingen"
            name="afmetingen"
            onChange={handleSelectChange("afmetingen")}
          />
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-2">Fabrikanten</h2>
          <fieldset className="grid items-center space-y-2">
            <div className="flex items-center">
              <input
                className="col-start-1 rounded mr-2"
                type="checkbox"
                value="MBI"
                name="fabrikant"
                id="mbi"
                onChange={handleSelectChange("fabrikant", true)}
              />
              <label className="w-fit col-start-2" htmlFor="mbi">
                MBI
              </label>
            </div>
            <div className="flex items-center">
              <input
                className="col-start-1 rounded mr-2"
                type="checkbox"
                value="Gardenlux"
                name="fabrikant"
                onChange={handleSelectChange("fabrikant", true)}
                id="gardenlux"
              />
              <label className="w-fit col-start-2" htmlFor="gardenlux">
                Gardenlux
              </label>
            </div>
          </fieldset>
        </section>
        <section className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Dikte</h2>
          <fieldset className="grid items-center space-y-2">
            {dikteInputs}
          </fieldset>
        </section>
        <div className="flex flex-col justify-between items-center mt-4">
          <button
            type="submit"
            className="bg-[--primary] hover:bg-red-500 rounded-lg text-white font-bold py-2 px-5 shadow-sm hover:shadow-md transition-all duration-200 mt-3 text-lg"
          >
            Zoeken
          </button>
          <button
            type="reset"
            className="text-slate-950 dark:text-slate-100 font-md mt-2 text-base hover:underline"
          >
            Filters verwijderen
          </button>
        </div>
      </section>
    </form>
  );
}
