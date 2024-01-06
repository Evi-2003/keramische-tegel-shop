/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useShoppingCart } from "use-shopping-cart";
import CartItem from "./CartItem";
import CheckoutButton from "./CheckoutButton";
import getProductsById from "../data/getProductById";
import Link from "next/link";
import { useEffect } from "react";

export default function ShoppingCart() {
  const { addItem, totalPrice, cartCount, cartDetails, setItemQuantity } =
    useShoppingCart();
  const verzendKosten = {
    name: "Verzendkosten",
    description: "Bezorgkosten binnen Nederland",
    id: "verzendkosten",
    price: 9000,
    currency: "EUR",
  };
  useEffect(() => {
    console.log("a");
    function checkVerzendkosten() {
      addItem(verzendKosten, { count: 1 });
    }
    checkVerzendkosten();
    setItemQuantity("verzendkosten", 1);
  }, []);

  return (
    <>
      <section className="z-30 border text-base text-black dark:text-slate-100 flex flex-col w-full py-5 lg:px-5 shadow-lg rounded-md text-left gap-y-5">
        <h1 className="mb-3 text-3xl w-full text-center font-medium">
          Winkelmand
        </h1>
        <table className="table w-full table-auto text-sm font-normal row-start-1 col-span-full">
          <thead>
            <tr>
              <th></th>
              <th className="pb-3 lg:px-2 text-base">Product</th>
              <th className="pb-3 lg:px-2 text-base">Prijs</th>
              <th className="pb-3 lg:px-2 text-base">Aantal (m2/stuks)</th>
            </tr>
          </thead>
          <tbody>
            {cartCount && cartCount > 0 ? (
              <>
                {Object.values(cartDetails ?? {}).map((entry) => (
                  <CartItem key={entry.id} item={entry} />
                ))}
              </>
            ) : (
              <tr>
                <td colspan="3" className="lg:px-2">
                  Je winkelmand is leeg
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {cartCount && cartCount > 0 ? (
          <>
            <span className="row-start-2 col-start-1 mx-5">
              Totaalprijs: €{(totalPrice / 100).toFixed(2)},-
            </span>
          </>
        ) : (
          <>
            <Link
              href="/shop"
              className="mx-5 w-fit bg-sky-600 text-white dark:text-slate-100 dark:bg-sky-800 lg:px-5 rounded-lg py-2 shadow-xl"
            >
              Verder winkelen
            </Link>
          </>
        )}
      </section>
    </>
  );
}
