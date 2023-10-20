"use client";
import Link from "next/link";
import { useState } from "react";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import formatProductData from "../data/formatProductData";
import Image from "next/image";

export default function Product({ productData }) {
  const { addItem, cartDetails } = useShoppingCart();
  const [quantity, setQuantity] = useState(1);
  function removeHtmlTags(str) {
    str = str.replace(/<[^>]*>/g, ""); // Remove HTML tags
    str = str.replace("€&nbsp;", ""); // Remove "€&nbsp;"
    return str;
  }
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const productFormattedData = formatProductData(productData);
  console.log(productFormattedData);
  const addToCart = () => {
    addItem(productFormattedData[0], { count: quantity });
    setQuantity(1);
  };

  return (
    <main className="w-4/5 lg:w-2/3">
      <article
        className="grid grid-cols-1 lg:grid-cols-2 w-full lg:p-10"
        key={productData.id}
      >
        <Image
          src={productData.image.sourceUrl}
          alt={productData.image.altText}
          width={256}
          height={256}
          className="row-start-1 row-span-full col-start-1 w-full min-h-[50vh] h-[50vh] max-h-[50vh] object-cover rounded-2xl"
        ></Image>
        <aside className="row-start-2 flex flex-col lg:row-start-1 lg:col-start-2 m-10 justify-start self-start text-left space-y-5">
          <h1 className="text-5xl ml-5 dark:text-slate-100">
            {productData.name}
          </h1>
          <p className="ml-5 text-xl dark:text-slate-100">
            {removeHtmlTags(productData.shortDescription)}
          </p>
          <span
            className="text-left bg-sky-950 dark:bg-sky-800 text-white px-5 py-1 ml-5 dark:text-slate-100 w-fit py-1 rounded-lg text-xl"
            aria-label={
              "Prijs van " +
              productData.name +
              " is €" +
              removeHtmlTags(productData.price)
            }
          >
            € {removeHtmlTags(productData.price)}
          </span>
          <div className="bg-white w-fit mx-5 rounded-lg text-lg dark:bg-sky-800 dark:text-slate-100">
            <button
              /* You will need to bind your decreaseQuantity and increaseQuantity method here */
              onClick={decreaseQuantity}
              className="hover:text-emerald-500 hover:bg-emerald-50 w-8 h-8 rounded-full transition-colors duration-500"
            >
              -
            </button>
            <span className="w-10 text-center rounded-md mx-3">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="hover:text-emerald-500 hover:bg-emerald-50 w-8 h-8 rounded-full transition-colors duration-500"
            >
              +
            </button>
          </div>
          <a
            onClick={() => addToCart(productData)} href="/winkelmand"
            className="text-left bg-sky-600 text-white px-5 py-1 ml-5 dark:text-slate-100 w-fit py-1 rounded-lg text-xl hover:scale-95 shadow-lg hover:shadow-xl"
          >
            Toevoegen aan winkelmand
          </a>
        </aside>
      </article>
    </main>
  );
}
