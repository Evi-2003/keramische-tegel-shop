"use client";
import { usePathname, useSearchParams } from "next/navigation";
import getFilters from "../data/getFilters.tsx";
import Creatable from "react-select";
import {
  Select as NextSelect,
  Button,
  Slider,
  Spacer,
} from "@nextui-org/react";

export default function FilterBar(path: string) {

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const pathname = usePathname();
  function sendFilters(formdata: FormData) {
    getFilters(formdata, pathname, searchParams.toString());
  }

  const options = [
    { value: "80x80x2cm", label: "80 x 80 x 2cm" },
    { value: "80x80x3cm", label: "80 x 80 x 3cm" },
  ];
  const categorieën = [
    { value: "tuin-tegels", label: "Tuin Tegels" },
    { value: "woon-tegels", label: "Woon tegels" },
  ];
  return (
    <form
      action={sendFilters}
      className="flex flex-col text-gray-800 space-y-4 p-5 bg-white shadow-lg rounded-lg w-full"
    >
      <section className="mb-5">
        <h2 className="text-lg font-semibold">Categorieën</h2>
        <Creatable
        isClearable
          options={categorieën}
          className="mt-2 text-base"
          placeholder="Categorieën"
          name="categorie"
        />
      </section>
      <section className="mb-5">
        <h2 className="text-lg font-semibold"><label>Afmetingen</label></h2>
        <Creatable
        isClearable
          options={options}
          className="mt-2 text-base"
          placeholder="Afmetingen"
          name="afmeting"
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
              id="gardenlux"
            />
            <label className="w-fit col-start-2" htmlFor="gardenlux">
              Gardenlux
            </label>
          </div>
        </fieldset>
      </section>
      <section className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Maximale Prijs</h2>
        <input
          type="range"
          min="0"
          max="250"
          value="250"
          onChange={(e) => {
            document.getElementById("priceValue").innerText = e.target.value;
          }}
          className="slider mt-2 w-full"
          id="priceRange"
        />
        <p id="priceValue">250</p>
      </section>
      <section className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Dikte</h2>
        <fieldset className="grid items-center space-y-2">
          <div className="flex items-center">
            <input
              className="col-start-1 rounded mr-2"
              type="checkbox"
              value="1cm"
              name="dikte"
              id="1cm"
            />
            <label className="w-fit col-start-2" htmlFor="dikte">
              1cm
            </label>
          </div>
          <div className="flex items-center">
            <input
              className="col-start-1 rounded mr-2"
              type="checkbox"
              value="2cm"
              name="dikte"
              id="2cm"
            />
            <label className="w-fit col-start-2" htmlFor="dikte">
              2cm
            </label>
          </div>
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
          className="text-gray-800 font-md mt-2 text-base hover:underline"
        >
          Filters verwijderen
        </button>
      </div>
    </form>
  );
}
