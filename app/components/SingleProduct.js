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
import getProducts from "../data/products.js";
import ThreejsProduct from './3dProduct.js';
import { usePathname, useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { lazy, Suspense } from 'react'

export default function Product({ productData }) {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const hoeveelheid = searchParams.get('hoeveelheid')
  const pathname = usePathname()
  const minHoeveelheidTegels = parseInt(productData.allPaMinimumAantal)
  //console.log("product")
  //console.log(productData)
  let afmetingenArray = Object.keys(productData.allPaAfmetingen.nodes).map((key) => [key, productData.allPaAfmetingen.nodes[key]])

  const { addItem, cartDetails } = useShoppingCart();

  const [quantity, setQuantity] = useState(hoeveelheid ? parseInt(hoeveelheid) : minHoeveelheidTegels);
  const [selectedVariation, setSelectedVariation] = useState("");
  const ThreejsProduct = dynamic(() => import('./3dProduct'), { ssr: false });
  function removeHtmlTags(str) {
    str = str.replace(/<[^>]*>/g, ""); 
    str = str.replace("€&nbsp;", ""); 
    return str;
  }

  function setQuantityFromUrl(quantityFromUrl){
    if(hoeveelheid >= parseInt(minHoeveelheidTegels) ){
      setQuantity(parseInt(quantityFromUrl))
  
    }  
  }

 
  const decreaseQuantity = () => {
    if (quantity >= minHoeveelheidTegels) {
      setQuantity(quantity - 1);
      optionsUrl(pathname, searchParams, 'hoeveelheid', quantity - 1)
    }
  };
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.textContent);
    if (!isNaN(newQuantity) && newQuantity >= minHoeveelheidTegels) {
      setQuantity(newQuantity);
      optionsUrl(pathname, searchParams, 'hoeveelheid', newQuantity)
    } else {
      alert("Minimum hoeveelheid tegels is " + minHoeveelheidTegels)
      event.target.textContent = parseInt(minHoeveelheidTegels)
      setQuantity(parseInt(minHoeveelheidTegels));
      optionsUrl(pathname, searchParams, 'hoeveelheid',  parseInt(minHoeveelheidTegels))
    }
  };
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    optionsUrl(pathname, searchParams, 'hoeveelheid', quantity + 1)
  };

  const addToCart = () => {
    addItem(productFormattedData[0], { count: quantity });
  };
  function minimaleBestelFormaat(nummer) {
    return nummer.replace(/-/g, '.');
  }

  let m2Size;

  const prijsOpFormaat = selectedVariation !== ""
  ? removeHtmlTags((productData.allPaAfmetingen.nodes.find(({ name }) => name === selectedVariation)?.variations?.edges[0]?.node?.price || removeHtmlTags(productData.price)))
  : removeHtmlTags(productData.price)

  const prijsinFloat = parseFloat(prijsOpFormaat) * quantity
  const totalePrijs = prijsinFloat.toString().replace('.', ',')

  const totalePrijsZonderBtwinFloat = parseFloat(prijsinFloat - ((prijsinFloat / 100) * 21)).toFixed(2)
  const totalePrijsZonderBtw = parseFloat(totalePrijsZonderBtwinFloat).toFixed(2).toString().replace('.', ',')
  let Afmeting;
  const selectAfmeting = (event) => {
    const gekozenAfmeting = event.target.value.substring(
      event.target.selectionStart,
      event.target.selectionEnd,
    );
    setSelectedVariation(gekozenAfmeting);
   
    optionsUrl(pathname, searchParams, 'afmeting', gekozenAfmeting);
  }

  useEffect(() => {
    if(searchParams.get("afmeting") != undefined){

      document.querySelector('select').value = searchParams.get("afmeting")
    } 
    if(hoeveelheid >= parseInt(minHoeveelheidTegels)){
      setQuantityFromUrl(hoeveelheid);
    } else {
      setQuantity(parseInt(minHoeveelheidTegels))
    }
  }, []); 

  const afmetingSelected = searchParams.get("afmeting") ? searchParams.get("afmeting") : productData.afmeting

  const dimensions = afmetingSelected.split(' x ');

  // Extract the individual dimensions
  const length = parseInt(dimensions[0]);
  const width = parseInt(dimensions[1]);
  const thickness = parseInt(dimensions[2].replace('cm', ''));

  // Calculate the square meter size
  const m2SizeCalculated = (length * width) / 10000;
  //console.log(m2SizeCalculated)
  

  return (
    <main className="w-4/5 lg:w-10/12 2xl:w-3/5 my-5">
      <article
        className="grid grid-cols-1 lg:grid-cols-2 w-full lg:p-10 items-center bg-slate-100 py-5 rounded-lg"
        key={productData.id}
      >

        <ThreejsProduct imageUrl={
                selectedVariation !== ""
                  ? (productData.allPaAfmetingen.nodes.find(({ name }) => name === selectedVariation)?.variations?.edges[0]?.node?.image?.sourceUrl || productData.image.sourceUrl)
                  : productData.image
              } className="hidden" />
                  <Image
              src={
                selectedVariation !== ""
                  ? (productData.allPaAfmetingen.nodes.find(({ name }) => name === selectedVariation)?.variations?.edges[0]?.node?.image?.sourceUrl || productData.image.sourceUrl)
                  : productData.image
              }
            
            

          alt={"Afbeelding van de " + productData.name}
          width={320}
          priority="high"
          height={320}
          className="row-start-1 col-start-1 w-4/5 lg:w-4/5 2xl:w-3/5 justify-self-center shadow-lg object-cover hover:scale-105"
        ></Image>
        <aside className="row-start-2 grid grid-cols-3 grid-rows-auto tempalte-col lg:row-start-1 lg:col-start-2 lg:col-span-3 mx-10 justify-start self-start text-left space-y-2">
          <h1 className="text-3xl font-medium  row-start-1 col-span-full">
            {productData.name + ' ' + productData.allPaKleurNaam}
          </h1>
          
          <p maxlength="50" className="text-base row-start-2 col-span-full">
            <span className="text-lg font-medium ">De {productData.name} in het kort:</span><br aria-hidden="true"/>
            {/*productData.shortDescription && removeHtmlTags(productData.shortDescription)*/}
          </p>
          <h3 className="text-lg font-medium  col-start-1 col-span-2 row-start-3">Aantal (m2)</h3>
          <span className="col-start-1 row-start-4 text-lg border-2 border-solid border-[--primary] w-fit rounded-lg  px-5 py-[0.15em] flex items-center self-start m-0">{(m2SizeCalculated * quantity).toFixed(2)}</span>
          <h3 className="col-span-2 text-lg font-medium  col-start-1 row-start-3 lg:col-start-2">Hoeveelheid (tegels)<br aria-hidden="true"></br></h3>
          <div className="col-start-2 row-start-4 text-lg border-2 border-solid border-[--primary] w-fit rounded-lg h-fit self-start flex items-center">
            
                {quantity > minHoeveelheidTegels ? (
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
          Array.isArray(afmetingenArray) ?
          (
            afmetingenArray.map(([, { name }], index) => (
              <option key={index} value={name}>{name}</option>
            ))
          ) : (
            <span>Iets gaat fout</span>
          )
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
        <Image
              src={
                selectedVariation !== ""
                  ? (productData.allPaAfmetingen.nodes.find(({ name }) => name === selectedVariation)?.variations?.edges[0]?.node?.image?.sourceUrl || productData.image.sourceUrl)
                  : productData.image
              }
            
            

          alt={"Afbeelding van de " + productData.name}
          width={320}
          priority="high"
          height={320}
          className="row-start-1 col-start-1 w-3/5 lg:w-4/5 2xl:w-3/5 justify-self-center shadow-lg object-cover hover:scale-105"
        ></Image>
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



