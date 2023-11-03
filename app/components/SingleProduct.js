"use client";
import Link from "next/link";
import { useState } from "react";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import formatProductData from "../data/formatProductData";
import Image from "next/image";
import Script from "next/script"
import Head from 'next/head'

export default function Product({ productData }) {
  const { addItem, cartDetails } = useShoppingCart();
  const [quantity, setQuantity] = useState(parseInt(productData.attributes.nodes[2].options[0]));
  function removeHtmlTags(str) {
    str = str.replace(/<[^>]*>/g, ""); // Remove HTML tags
    str = str.replace("€&nbsp;", ""); // Remove "€&nbsp;"
    return str;
  }
  const decreaseQuantity = () => {
    if (quantity >= productData.attributes.nodes[2].options[0]) {
      setQuantity(quantity - 1);
    }
  };
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.textContent);
    if (!isNaN(newQuantity) && newQuantity >= productData.attributes.nodes[2].options[0]) {
      setQuantity(newQuantity);
    } else {
      alert("Minimum hoeveelheid tegels is " + productData.attributes.nodes[2].options[0])
      event.target.textContent = parseInt(productData.attributes.nodes[2].options[0])
      setQuantity(parseInt(productData.attributes.nodes[2].options[0]));
    }
  };
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const productFormattedData = formatProductData(productData);
  const addToCart = () => {
    addItem(productFormattedData[0], { count: quantity });
    setQuantity(1);
  };
  function minimaleBestelFormaat(nummer) {
    return nummer.replace(/-/g, '.');
  }
  const minFormaatString = minimaleBestelFormaat(productData.attributes.nodes[1].options[0])
  const minFormaatFloat = parseFloat(minFormaatString);
  const prijsinFloat = (parseFloat(productData.price.replace(',', '.')) * quantity).toFixed(2)
  const totalePrijs = prijsinFloat.toString().replace('.', ',')
  const totalePrijsZonderBtwinFloat = parseFloat(prijsinFloat - ((prijsinFloat / 100) * 21)).toFixed(2)
  const totalePrijsZonderBtw = parseFloat(totalePrijsZonderBtwinFloat).toFixed(2).toString().replace('.', ',')

  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": productData.name,
    "image": productData.image.sourceUrl,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "EUR",
      "price": totalePrijs
    }
  };
  
  <Head>
    <Script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  </Head>
  return (
    <main className="w-4/5 lg:w-10/12 my-5">
      <article
        className="grid grid-cols-1 lg:grid-cols-2 w-full lg:p-10 rounded-2xl items-center"
        key={productData.id}
      >

        <Image
          src={productData.image.sourceUrl}
          alt={"Afbeelding van de " + productData.name}
          width={320}
          priority="high"
          height={320}
          className="row-start-1 col-start-1 w-4/5 justify-self-center shadow-lg object-cover hover:scale-105"
        ></Image>
        <aside className="row-start-2 grid grid-cols-3 grid-rows-auto tempalte-col lg:row-start-1 lg:col-start-2 lg:col-span-3 m-10 justify-start self-start text-left space-y-2">
          <h1 itemprop="name" className="text-4xl font-semibold ml-5 row-start-1 col-span-full">
            {productData.name}
          </h1>

          <p itemprop="description" className="ml-5 text-xl dark:text-slate-100 row-start-2 col-span-full">
            {productData.shortDescription && removeHtmlTags(productData.shortDescription)}
          </p>
          <h3 className="text-lg font-medium mx-5 col-start-1 col-span-2 row-start-3">Hoeveelheid (m2)</h3>
          <span className="col-start-1 row-start-4 text-lg border-2 border-solid border-[--primary] w-fit rounded-lg mx-5 px-5 py-1 flex items-center">{(minFormaatFloat * quantity).toFixed(2)}</span>
          <h3 className="col-start-2 col-span-2 row-start-3 text-lg font-medium mx-5 col-start-1 row-start-3">Hoeveelheid (tegels)<br aria-hidden="true"></br></h3>
          <div className="col-start-2 row-start-4 text-lg flex items-center border-2 border-[--primary] border-solid w-fit rounded-lg py-1 mx-5">
            
                {quantity > productData.attributes.nodes[2].options[0] ? (
        <button
          onClick={decreaseQuantity}
          className="0 w-8 h-8 rounded-full hover:scale-90"
        >
          -
        </button>
      ) : (        <button
        onClick={decreaseQuantity}
        className="0 w-8 h-8 rounded-full hover:cursor-not-allowed hover:scale-95" disabled
      >
        -
      </button>)}
            <span contentEditable="true" onBlur={handleQuantityChange} className="w-10 text-center rounded-md hover:underline hover:cursor-pointer">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="w-8 h-8 rounded-full hover:scale-90"
            >
              +
            </button>
          </div>
          <h3 className="col-start-1 row-start-6 text-lg font-medium mx-5 col-start-1 row-start-3">Afmetingen</h3>        
          <select className="col-start-1 row-start-7 mx-5 bg-transparent text-slate-950 rounded-lg border-2 shadow-lg border-sky-950 border-solid py-2 w-fit px-5 hover:scale-95 shadow-lg hover:cursor-pointer ">
            {
                productData.attributes.nodes[0].options.map(( product, index ) => (
                  <option key={index}>{product.replace(/-/g, ' ')}</option>
                ))
            }
          </select>
          <dl className="col-start-1 col-span-2 row-start-8 mx-5 text-lg grid grid-cols-2 grid-rows-auto">
            <dt className="col-start-1 row-start-1">Incl. btw</dt>
            <dd             
              className="col-start-1 row-start-2"
              aria-label={
                "Prijs van " +
                (productData.name || "Geen naam") +
                " is €" +
                (totalePrijs || "Geen prijs gevonden") +
                " inclusief belasting"
              }
              itemprop="price"
            >
 
              € {totalePrijs}
            </dd>
            <dt className="col-start-2 row-start-1 mx-5">Excl. btw</dt>
            <dd              
                          className="col-start-2 row-start-2 mx-5"
            aria-label={
                "Prijs van " +
                (productData.name || "Geen naam") +
                " is €" +
                (productData.price && totalePrijsZonderBtw || "Geen prijs gevonden")
                +
                " exclusief belasting"
              }>€ {totalePrijsZonderBtw}</dd>
          </dl>
          <a
            onClick={() => addToCart(productData)} href="/winkelmand"
            className="col-span-full row-start-9 text-left px-5 bg-green-500 text-white font-semibold ml-5 w-fit py-1 rounded-lg text-lg hover:scale-95 shadow-lg hover:shadow-xl"
          >
            Toevoegen aan winkelmand
          </a>
        </aside>
      </article>
    </main>
  );
  
}
const structuredData = {
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "GeoCeramica Patina Taupe",
  "image": "productData.image.sourceUrl",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "EUR",
    "price": "606.66"
  }
};



