"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import formatProductData from "../data/formatProductData";
import Image from "next/image";
import Script from "next/script"
import Head from 'next/head'
import optionsUrl from './serverActionUrl.tsx'
import RelatedProducts from "./RelatedProducts";
import { usePathname, useSearchParams } from 'next/navigation'

export default function Product({ productData }) {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
 
  const hoeveelheid = searchParams.get('hoeveelheid')
  const pathname = usePathname()
  const { addItem, cartDetails } = useShoppingCart();
  const [quantity, setQuantity] = useState(hoeveelheid ? parseInt(hoeveelheid) : parseInt(productData.attributes.nodes[2].options[0]));
  function removeHtmlTags(str) {
    str = str.replace(/<[^>]*>/g, ""); 
    str = str.replace("€&nbsp;", ""); 
    return str;
  }

  function setQuantityFromUrl(quantityFromUrl){
    if(hoeveelheid >= parseInt(productData.attributes.nodes[2].options[0]) ){
      setQuantity(parseInt(quantityFromUrl))
      console.log(quantityFromUrl + ' Hoeveelheid toegepast')
    } else{
      console.log('Hoeveelheid niet toegepast want hoeveelheid is: ' + hoeveelheid + ' en het minimale is: ' + parseInt(productData.attributes.nodes[2].options[0]))
    }
  }

 
  const decreaseQuantity = () => {
    if (quantity >= productData.attributes.nodes[2].options[0]) {
      setQuantity(quantity - 1);
      optionsUrl(pathname, searchParams, 'hoeveelheid', quantity - 1)
    }
  };
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.textContent);
    if (!isNaN(newQuantity) && newQuantity >= productData.attributes.nodes[2].options[0]) {
      setQuantity(newQuantity);
      optionsUrl(pathname, searchParams, 'hoeveelheid', newQuantity)
    } else {
      alert("Minimum hoeveelheid tegels is " + productData.attributes.nodes[2].options[0])
      event.target.textContent = parseInt(productData.attributes.nodes[2].options[0])
      setQuantity(parseInt(productData.attributes.nodes[2].options[0]));
      optionsUrl(pathname, searchParams, 'hoeveelheid',  parseInt(productData.attributes.nodes[2].options[0]))
    }
  };
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    optionsUrl(pathname, searchParams, 'hoeveelheid', quantity + 1)
  };
  const productFormattedData = formatProductData(productData);
  const addToCart = () => {
    addItem(productFormattedData[0], { count: quantity });
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
  const selectAfmeting = (event) => {
    const gekozenAfmeting = event.target.value.substring(
      event.target.selectionStart,
      event.target.selectionEnd,
    );
    optionsUrl(pathname, searchParams, 'afmeting', gekozenAfmeting)
  }



  useEffect(() => {
    if(searchParams.get("afmeting") != undefined){
      console.log("Afmeting ingesteld")
      document.querySelector('select').value = searchParams.get("afmeting")
    } 
    if(hoeveelheid >= parseInt(productData.attributes.nodes[2].options[0])){
      setQuantityFromUrl(hoeveelheid);
    } else {
      setQuantity(parseInt(productData.attributes.nodes[2].options[0]))
    }
  }, []); 
 
  return (
    <main className="w-4/5 lg:w-10/12 2xl:w-3/5 my-5">
      <article
        className="grid grid-cols-1 lg:grid-cols-2 w-full lg:p-10 items-center bg-slate-100 py-5 rounded-lg"
        key={productData.id}
      >

        <Image
          src={productData.image.sourceUrl}
          alt={"Afbeelding van de " + productData.name}
          width={320}
          priority="high"
          height={320}
          className="row-start-1 col-start-1 w-3/5 lg:w-4/5 2xl:w-3/5 justify-self-center shadow-lg object-cover hover:scale-105"
        ></Image>
        <aside className="row-start-2 grid grid-cols-3 grid-rows-auto tempalte-col lg:row-start-1 lg:col-start-2 lg:col-span-3 mx-10 justify-start self-start text-left space-y-2">
          <h1 className="text-3xl font-medium  row-start-1 col-span-full">
            {productData.name}
          </h1>
          
          <p maxlength="5" className="text-base row-start-2 col-span-full">
            <span className="text-lg font-medium ">De {productData.name} in het kort:</span><br aria-hidden="true"/>
            {productData.shortDescription && removeHtmlTags(productData.shortDescription)}
          </p>
          <h3 className="text-lg font-medium  col-start-1 col-span-2 row-start-3">Aantal (m2)</h3>
          <span className="col-start-1 row-start-4 text-lg border-2 border-solid border-[--primary] w-fit rounded-lg  px-5 py-[0.15em] flex items-center self-start m-0">{(minFormaatFloat * quantity).toFixed(2)}</span>
          <h3 className="col-span-2 text-lg font-medium  col-start-1 row-start-3 lg:col-start-2">Hoeveelheid (tegels)<br aria-hidden="true"></br></h3>
          <div className="col-start-2 row-start-4 text-lg border-2 border-solid border-[--primary] w-fit rounded-lg h-fit self-start flex items-center">
            
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
            <span suppressContentEditableWarning={true} contentEditable={true} onBlur={handleQuantityChange}  className="w-10 text-center rounded-md hover:underline hover:cursor-pointer">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="w-8 h-8 rounded-full hover:scale-90"
            >
              +
            </button>
          </div>
          <h3 className="text-lg font-medium  col-start-1 row-start-6">Afmetingen</h3>        
          <select onChange={selectAfmeting} className="col-start-1 row-start-7  bg-transparent text-slate-950 rounded-lg border-2 shadow-lg border-[--primary] border-solid py-2 w-fit px-5 hover:scale-95 shadow-lg hover:cursor-pointer ">
            {
                productData.attributes.nodes[0].options.map(( product, index ) => (
                  <option key={index} value={product.replace(/-/g, ' ')}>{product.replace(/-/g, ' ')}</option>
                ))
            }
          </select>
          <dl className="col-start-1 col-span-2 row-start-8  text-lg grid grid-cols-2 grid-rows-auto">
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
            >
 
              € {totalePrijs}
            </dd>
            <dt className="col-start-2 row-start-1 ">Excl. btw</dt>
            <dd              
                          className="col-start-2 row-start-2 "
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
            className="col-span-full row-start-9 text-left px-5 bg-green-500 text-white font-semibold  w-fit py-1 rounded-lg text-lg hover:scale-95 shadow-lg hover:shadow-xl"
          >
            Toevoegen aan winkelmand
          </a>
        </aside>
      </article>
      <section className="overflow-auto flex-1 flex items-center bg-slate-100 p-10 rounded-lg w-full mt-5 flex-col justify-items-center shadow-xl">
        <h3 className="text-3xl font-medium mb-5">Gerelateerde producten</h3>
        <RelatedProducts product={productData} />
      </section>
      
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



