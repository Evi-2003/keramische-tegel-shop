"use client";
import makeOrder from "../checkout/makeOrder";
import { useShoppingCart } from "use-shopping-cart";
export default function AfrekenenForm() {
  const { addItem, totalPrice, cartCount, cartDetails, setItemQuantity } =
    useShoppingCart();
  const maakDeOrder = makeOrder.bind(cartDetails, cartDetails);
  return (
    <>
      <section className="border rounded-lg w-1/2 flex flex-col shadow-xl py-5">
        <h2 className="mb-3 font-medium">Afrekenen</h2>
        <form
          action={maakDeOrder}
          className="text-base font-light space-y-1 flex flex-col w-2/3 self-center text-left"
        >
          <label className="font-medium" htmlFor="voornaam">
            Voornaam
          </label>
          <input
            required
            type="text"
            name="voornaam"
            placeholder="Jan"
            className=" block w-full px-3 py-2 border border-slate-300 dark:text-slate-50 bg-transparent  rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
       invalid:text-red-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "
          />
          <label className="font-medium" htmlFor="achternaam">
            Achternaam
          </label>
          <input
            required
            type="text"
            name="achternaam"
            placeholder="Jansen"
            className=" block w-full px-3 py-2 bg-transparent border border-slate-300 dark:text-slate-50  rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
       invalid:text-red-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "
          />
          <label className="font-medium" htmlFor="mail">
            E-mail
          </label>
          <input
            required
            type="email"
            name="mail"
            placeholder="jan.jansen@example.com"
            className=" block w-full px-3 py-2 bg-transparent border border-slate-300 dark:text-slate-50  rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
       invalid:text-red-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "
          />
          <label className="font-medium" htmlFor="adres">
            Straat & Huisnummer
          </label>
          <input
            required
            type="text"
            name="adres"
            placeholder="Damrak 1"
            className=" block w-full px-3 py-2 bg-transparent border border-slate-300 dark:text-slate-50  rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
       invalid:text-red-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "
          />
          <label className="font-medium" htmlFor="postcode">
            Postcode
          </label>
          <input
            required
            type="text"
            name="postcode"
            placeholder="1012 LG"
            className=" block w-full px-3 py-2 bg-transparent border border-slate-300 dark:text-slate-50  rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
       invalid:text-red-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "
          />
          <label className="font-medium" htmlFor="plaats">
            Plaats
          </label>
          <input
            required
            type="text"
            name="plaats"
            placeholder="Amsterdam"
            className=" block w-full px-3 py-2 bg-transparent border border-slate-300 dark:text-slate-50  rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
       invalid:text-red-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "
          />
          <label className="font-medium" htmlFor="nummer">
            Telefoonnummer
          </label>
          <input
            required
            type="tel"
            name="nummer"
            placeholder="06-12345678"
            className=" block w-full px-3 py-2 bg-transparent border border-slate-300 dark:text-slate-50  rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
       invalid:text-red-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "
          />
          <article className="flex text-base gap-x-5 py-3">
            <button
              type="submit"
              value="Plaats bestelling"
              onSubmit={maakDeOrder}
              className="bg-[--primary] py-1 rounded-lg font-medium w-fit px-5 text-slate-100 hover:scale-95 hover:shadow-lg shadow-sm"
            >
              Afrekenen
            </button>
          </article>
          <span className="text-sm rounded-lg w-fit">
            Bij de volgende stap kies je betaalmethode
          </span>
        </form>
      </section>
    </>
  );
}
