/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import formatProductData from "../data/formatProductData";
import Image from "next/image";
import Head from "next/head";
import optionsUrl from "./serverActionUrl.tsx";
import RelatedProducts from "./RelatedProducts";
import getProducts from "../data/products.js";
import ThreejsProduct from "./3dProduct.js";
import { usePathname, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { lazy, Suspense } from "react";
import Script from "next/script";
import getProductBySlug from "../data/getProductBySlug";
// eslint-disable-next-line
export default function Product({ product, slug }) {
  let productData = product.product;
  function removeHtmlTags(str, shouldClean = true) {
    if (shouldClean) {
      str = str.replace(/<[^>]*>/g, "");
      str = str.replace("€&nbsp;", "");
    }
    return str;
  }

  function cleanupObject(obj) {
    for (let key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        cleanupObject(obj[key]);
      } else if (typeof obj[key] === "string") {
        obj[key] = removeHtmlTags(obj[key], key !== "description");
      }
    }
  }

  cleanupObject(productData);

  if (!product) {
    redirect("/404");
  }
  function removeHtmlTags(str, shouldClean = true) {
    if (shouldClean) {
      str = str.replace(/<[^>]*>/g, "");
      str = str.replace("€&nbsp;", "");
    }
    return str;
  }
  console.log(productData);
  function cleanupObject(obj) {
    for (let key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        cleanupObject(obj[key]);
      } else if (typeof obj[key] === "string") {
        obj[key] = removeHtmlTags(obj[key], key !== "description");
      }
    }
  }

  cleanupObject(productData);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const hoeveelheid = searchParams.get("hoeveelheid");
  const pathname = usePathname();
  const minHoeveelheidTegels = parseInt(
    productData.attributes.nodes.find(
      (node) => node.name == "pa_minimum-aantal"
    ).options[0]
  );
  const afmetingFromProduct = productData.attributes.nodes.find(
    (node) => node.name == "pa_afmetingen"
  ).options[0];
  const kleurFromProduct = productData.attributes.nodes.find(
    (node) => node.name == "pa_kleur-naam"
  ).options[0];
  const kleurProduct = kleurFromProduct
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const { addItem, cartDetails } = useShoppingCart();

  const [quantity, setQuantity] = useState(
    hoeveelheid ? parseInt(hoeveelheid) : minHoeveelheidTegels
  );

  const [selectedVariation, setSelectedVariation] = useState("");
  const ThreejsProduct = dynamic(() => import("./3dProduct"), { ssr: false });
  function removeHtmlTags(str) {
    str = str.replace(/<[^>]*>/g, "");
    str = str.replace("€&nbsp;", "");
    return str;
  }

  function setQuantityFromUrl(quantityFromUrl) {
    if (hoeveelheid >= parseInt(minHoeveelheidTegels)) {
      setQuantity(parseInt(quantityFromUrl));
    }
  }

  const decreaseQuantity = () => {
    if (quantity >= minHoeveelheidTegels) {
      setQuantity(quantity - 1);
      optionsUrl(
        "",
        pathname,
        searchParams,
        "hoeveelheid",
        quantity - 1,
        "push"
      );
    }
  };
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.textContent);
    if (!isNaN(newQuantity) && newQuantity >= minHoeveelheidTegels) {
      setQuantity(newQuantity);
      optionsUrl(
        "http://",
        pathname,
        searchParams,
        "hoeveelheid",
        newQuantity,
        "push"
      );
    } else {
      alert("Minimum hoeveelheid tegels is " + minHoeveelheidTegels);
      event.target.textContent = parseInt(minHoeveelheidTegels);
      setQuantity(parseInt(minHoeveelheidTegels));
      optionsUrl(
        "",
        pathname,
        searchParams,
        "hoeveelheid",
        parseInt(minHoeveelheidTegels)
      );
    }
  };
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    optionsUrl(
      "http://",
      pathname,
      searchParams,
      "hoeveelheid",
      quantity + 1,
      "push"
    );
  };

  const addToCart = () => {
    const productForCart = formatProductData(productData, quantity);
    console.log(productForCart[0]);
    addItem(productForCart[0], { count: quantity });
  };
  function minimaleBestelFormaat(nummer) {
    return nummer.replace(/-/g, ".");
  }

  let m2Size;

  const prijsOpFormaat = removeHtmlTags(productData.price);
  const prijsinFloat = parseFloat(prijsOpFormaat.replace(",", ".")) * quantity;
  const totalePrijs = prijsinFloat.toFixed(2).toString().replace(".", ",");

  const totalePrijsZonderBtwinFloat = parseFloat(
    prijsinFloat - (prijsinFloat / 100) * 21
  ).toFixed(2);
  const totalePrijsZonderBtw = parseFloat(totalePrijsZonderBtwinFloat)
    .toFixed(2)
    .toString()
    .replace(".", ",");

  useEffect(() => {
    if (searchParams.get("afmeting") != undefined) {
      document.querySelector("select").value = searchParams.get("afmeting");
    }
    if (hoeveelheid >= parseInt(minHoeveelheidTegels)) {
      setQuantityFromUrl(hoeveelheid);
    } else {
      setQuantity(parseInt(minHoeveelheidTegels));
    }
  }, []);

  const dimensions = afmetingFromProduct.split("-x-");
  const afmetingMetSlug = {
    afmeting: afmetingFromProduct.replace(/-x-/g, " x ").replace(/-/g, "."),
    slug: productData.slug,
    id: productData.databaseId,
  };
  const afmetingMetSpaties = afmetingFromProduct
    .replace(/-x-/g, " x ")
    .replace(/-/g, ".");
  const length = parseInt(dimensions[0]);
  const widthTegel = parseInt(dimensions[1]);
  const thickness = parseInt(dimensions[2].replace("cm", ""));

  const m2SizeCalculated = (length * widthTegel) / 10000;

  const getVariations = (productData, currentDimension) => {
    // splits het huidige productSlug op "-" en verwijder het laatste onderdeel (de afmeting)
    const baseSlug = currentDimension.slug.split("-").slice(0, -1).join("-");

    const variants = [];

    const seenSlugs = new Set();

    productData
      .filter(
        (el) =>
          el.productSlug.startsWith(baseSlug) &&
          el.name === "pa_afmetingen" &&
          el.productSlug !== currentDimension.slug
      )
      .forEach((variant) => {
        if (!seenSlugs.has(variant.productSlug)) {
          seenSlugs.add(variant.productSlug);
          variants.push({
            afmeting: variant.value,
            slug: variant.productSlug,
          });
        }
      });

    return variants;
  };

  const afmetingen = getVariations(
    productData.variantAttributes,
    afmetingMetSlug
  );
  if (afmetingMetSlug) {
    afmetingen.unshift(afmetingMetSlug);
  }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  let kleuren = [];
  let serieNaam = productData.attributes.nodes.find(attr => attr.name === 'pa_serienaam').options[0];
  let currentColorAttr = productData.attributes.nodes.find(attr => attr.name === 'pa_kleur').options[0];
  
  for(let i = 0; i < productData.variantAttributes.length; i++){
    if(productData.variantAttributes[i].name === 'pa_serienaam' && productData.variantAttributes[i].value === serieNaam) {
      let colorAttr = productData.variantAttributes.find(attr => attr.name === 'pa_kleur-naam' && attr.productId === productData.variantAttributes[i].productId);
      if(colorAttr && colorAttr.value !== currentColorAttr) {
        if(!kleuren.some(kleur => kleur.kleur === colorAttr.value)) {
          kleuren.push({ kleur: colorAttr.value, slug: colorAttr.productSlug });
        }
      }
    }
  }

  kleuren.unshift({
    kleur: capitalizeFirstLetter(currentColorAttr),
    slug: productData.productSlug,
  });
  console.log(kleuren);


  const [width, setWidth] = useState("130px");

  const changeWidth = (value) => {
    switch (value) {
      case "option1":
        setWidth("50px");
        break;
      case "option2":
        setWidth("50px");
        break;
      default:
        setWidth("100px");
    }
  };

  useEffect(() => {
    const selectedKleur = kleuren.find((kleur) => kleur.selected === true);
    if (selectedKleur) {
      changeWidth(selectedKleur.slug);
    }
  }, [kleuren]);

  const handleChange = (e) => {
    changeWidth(e.target.value);
    window.location.href = e.target.value;
  };

  return (
    <>
      <article
        className="flex flex-col md:grid grid-cols-1 lg:grid-cols-5 w-full lg:p-6 items-center shadow-md hover:shadow-lg border-2 border-solid border-primary rounded-lg dark:text-slate-100 py-5"
        key={productData.id}
      >
        <Image
          src={productData.image.sourceUrl}
          alt={"Afbeelding van de " + productData.name}
          width={320}
          priority="high"
          height={320}
          className="row-start-1 col-start-1 col-span-2 w-4/5 lg:w-4/5 2xl:w-3/5 justify-self-center shadow-lg object-cover hover:scale-105"
        ></Image>
        <aside className="row-start-2 grid grid-cols-2 auto-rows-min tempalte-col lg:row-start-1 lg:col-start-3 lg:col-span-3 mx-10 justify-start self-start text-left space-y-1 rounded-lg">
          <h1 className="text-[1.70rem] font-semibold  row-start-1 col-span-full">
            {productData.name} <br aria-hidden="true" />
            <span className="-mt-5 flex w-fit bg-[--primary] text-white px-5 rounded-lg text-base shadow-lg font-medium">
              {afmetingMetSpaties}
            </span>
          </h1>

          <p className="text-base row-start-2 col-span-full h-36 text-ellipsis overflow-hidden line-clamp-6">
            <span className="text-lg font-medium ">
              De {productData.name} in het kort:
            </span>
            <br aria-hidden="true" />
            {productData.shortDescription &&
              removeHtmlTags(productData.shortDescription)}
          </p>
          <h3 className="text-lg font-medium  col-start-1 col-span-2 row-start-3">
            Aantal (m2)
          </h3>
          <span className="col-start-1 row-start-4 text-lg border-2 border-solid border-[--primary] w-fit rounded-lg  px-5 py-[0.15em] flex items-center self-start m-0">
            {(m2SizeCalculated * quantity).toFixed(2)}
          </span>
          <h3 className="col-span-2 text-lg font-medium  col-start-1 row-start-3 lg:col-start-2">
            Hoeveelheid (tegels)<br aria-hidden="true"></br>
          </h3>
          <div className="col-start-2 row-start-4 text-lg border-2 border-solid border-[--primary] w-fit h-fit self-start flex items-center rounded-lg">
            {quantity > minHoeveelheidTegels ? (
              <button
                onClick={decreaseQuantity}
                className="0 w-8 h-8 rounded-full hover:scale-90"
              >
                -
              </button>
            ) : (
              <button
                onClick={decreaseQuantity}
                className="0 w-8 h-8 rounded-full hover:cursor-not-allowed hover:scale-95"
                disabled
              >
                -
              </button>
            )}
            <span
              suppressContentEditableWarning={true}
              contentEditable={true}
              onBlur={handleQuantityChange}
              role="textbox"
              tabIndex="0"
              className="w-10 text-center rounded-md hover:underline hover:cursor-pointer"
            >
              {quantity}
            </span>
            <button
              onClick={increaseQuantity}
              className="w-8 h-8 rounded-full hover:scale-90"
            >
              +
            </button>
          </div>
          <h3 className="text-lg font-medium  col-start-1 row-start-6">
            Afmetingen
          </h3>
          <select
            className="col-start-1 row-start-7  bg-transparent text-slate-950 dark:text-slate-100 rounded-lg border-2 border-[--primary] border-solid py-2 w-fit px-5 hover:scale-95 shadow-lg hover:cursor-pointer "
            onChange={(e) => (window.location.href = e.target.value)}
          >
            {Array.isArray(afmetingen) ? (
              afmetingen.map(({ afmeting, slug }, index) => (
                <option key={index} value={slug}>
                  {afmeting}
                </option>
              ))
            ) : (
              <span>Iets gaat fout</span>
            )}
          </select>

          <h3 className="text-lg font-medium  col-start- row-start-6">
            Kleuren
          </h3>
          <select
            id="kleurSelect"
            className="col-start-2 row-start-7 bg-transparent text-slate-950 dark:text-slate-100 rounded-lg border-2 border-[--primary] border-solid py-2 px-5 hover:scale-95 shadow-lg hover:cursor-pointer"
            onChange={handleChange}
            style={{ width: width }}
          >
            {Array.isArray(kleuren) ? (
              kleuren.map(({ kleur, slug, selected }, index) => (
                <option key={index} value={slug} selected={selected}>
                  {kleur}
                </option>
              ))
            ) : (
              <span>Iets gaat fout</span>
            )}
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
              className="col-start-2 row-start-2"
              aria-label={
                "Prijs van " +
                (productData.name || "Geen naam") +
                " is €" +
                ((productData.price && totalePrijsZonderBtw) ||
                  "Geen prijs gevonden") +
                " exclusief belasting"
              }
            >
              € {totalePrijsZonderBtw}
            </dd>
          </dl>

          <a
            onClick={() => addToCart(productData)}
            href="/winkelmand"
            className="flex top-2 relative col-span-full row-start-10 text-left px-5 bg-green-500 dark:bg-green-800 text-white font-semibold w-fit py-1 rounded-lg text-lg hover:scale-95 shadow-lg hover:shadow-xl"
          >
            Toevoegen aan winkelmand
          </a>
        </aside>
      </article>

      <section className="dark:text-slate-100 md:space-x-5 w-full flex md:flex-row flex-col">
        <section className="overflow-auto flex-1 inline-flex items-center shadow-md hover:shadow-lg border-2 border-solid border-primary p-10 rounded-lg mt-5 flex-col justify-items-center md:w-2/3">
          <h2 className="text-2xl font-medium mb-2 w-full text-left">
            Beschrijving {productData.name}
          </h2>
          <div
            dangerouslySetInnerHTML={{ __html: productData.description }}
          ></div>
        </section>

        <section className="md:w-1/3 h-96 md:h-auto inline-flex items-center p-10 rounded-lg mt-5 flex-col justify-items-center shadow-md hover:shadow-lg border-2 border-solid border-primary relative">
          <h3 className="text-3xl font-medium mb-5 text-slate-950 dark:text-slate-100">
            Product in 3D
          </h3>
          <svg
            className="w-10 h-10 absolute right-0 top-0 m-3"
            version="1.1"
            viewBox="0 0 1200 1200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m599.73 97.457c-5.2266 0.0625-10.191 2.3047-13.695 6.1875l-80.566 64.672c-3.875 3.125-6.3516 7.6562-6.8828 12.605-0.53516 4.9492 0.92188 9.9062 4.043 13.781 3.125 3.875 7.6602 6.3516 12.605 6.8828 4.9492 0.53125 9.9062-0.92188 13.781-4.0469l52.148-41.895v184.46l-312.23 176.59c-2.8906 1.6328-5.2969 4.0078-6.9688 6.8789-1.6758 2.8672-2.5547 6.1289-2.5547 9.4531h-0.035156v357.97l-159.89 92.25 10.254-66.246v-0.003906c0.96094-5.6445-0.71094-11.414-4.5352-15.676-3.8242-4.2578-9.3828-6.5391-15.094-6.1875-4.3359 0.25781-8.4492 2.0117-11.633 4.9648-3.1875 2.9492-5.25 6.918-5.8359 11.223l-16.188 104.92v-0.003906c-0.28906 1.8945-0.28906 3.8203 0 5.7109 0.09375 0.58203 0.21875 1.1562 0.36719 1.7227 0.74609 2.9688 2.2031 5.707 4.2461 7.9844 0.47266 0.51562 0.97656 1.0039 1.5039 1.4648 1.1758 1.0391 2.4805 1.9258 3.8789 2.6367 0.27734 0.14844 0.55859 0.29297 0.84375 0.42578 0.035156 0.011719 0.074219 0.023438 0.10938 0.039062 0.27734 0.12109 0.55859 0.24219 0.84375 0.35156 0.32422 0.15234 0.65625 0.29297 0.98828 0.42578l97.961 38.086c4.6758 1.9492 9.9375 1.9297 14.598-0.058594 4.6562-1.9844 8.3125-5.7695 10.141-10.492 1.8281-4.7227 1.6719-9.9844-0.43359-14.59-2.1094-4.6055-5.9844-8.1641-10.754-9.8672l-62.512-24.242 160.07-92.395 312.41 176.7c5.7539 3.2773 12.812 3.2773 18.566 0l312.34-176.66 160.07 92.324-62.438 24.281v-0.003907c-4.7656 1.7031-8.6445 5.2617-10.75 9.8672-2.1055 4.6055-2.2617 9.8633-0.43359 14.586s5.4844 8.5078 10.141 10.496c4.6562 1.9844 9.9219 2.0078 14.594 0.058594l98.293-38.23h-0.003906c0.81641-0.28906 1.6133-0.63281 2.3828-1.0273 0.039062-0.011719 0.074219-0.027343 0.11328-0.039062 0.52734-0.26953 1.0391-0.5625 1.5391-0.87891 0.023438-0.011718 0.046876-0.023437 0.070313-0.035156 1.0234-0.66406 1.9805-1.4219 2.8555-2.2695 0.011718-0.011719 0.023437-0.023437 0.035156-0.035156s0.027344-0.023438 0.039062-0.035157c0.42188-0.42187 0.82422-0.86328 1.207-1.3203 0.023437-0.023438 0.046875-0.046875 0.070312-0.070312 0.375-0.44531 0.73047-0.91016 1.0625-1.3906 0.023438-0.046874 0.046875-0.09375 0.070313-0.14062 0.32812-0.48438 0.63672-0.98828 0.91797-1.5 0.023437-0.050782 0.046874-0.097657 0.070312-0.14453 0.57031-1.0625 1.0352-2.1758 1.3906-3.3281v-0.039062c0.011719-0.023438 0.023437-0.046875 0.035156-0.070313 0.53516-1.7578 0.80469-3.5859 0.80859-5.4219v-0.14062c-0.011719-0.58594-0.050781-1.1758-0.11328-1.7578v-0.14062c-0.03125-0.29297-0.070313-0.58984-0.11328-0.87891l-0.14844-0.99219v-0.070313l-16.078-103.86c-0.64062-4.7266-3.0547-9.0273-6.7578-12.035-3.6992-3.0078-8.4062-4.4922-13.164-4.1523-5.2773 0.37891-10.148 2.9727-13.414 7.1367-3.2617 4.1641-4.6172 9.5117-3.7266 14.727l10.145 66.211-159.78-92.211v-357.97h-0.035157c0-3.3203-0.87891-6.582-2.5508-9.4531-1.6758-2.8711-4.0781-5.2422-6.9727-6.8789l-312.38-176.7v-184.46l52.293 42.004c5.2227 4.207 12.289 5.3086 18.543 2.8906 6.25-2.418 10.738-7.9883 11.773-14.613 1.0312-6.625-1.5469-13.297-6.7695-17.5l-81.078-65.074v-0.003906c-3.582-3.7422-8.5508-5.8398-13.734-5.7891zm0.25781 275.17 283.74 160.4-283.74 160.58-283.74-160.58zm-303.11 192.55 284.29 160.8v325.67l-284.29-160.8zm606.26 0v325.64l-284.44 160.91v-325.64z" />
          </svg>

          <ThreejsProduct imageUrl={productData.image.sourceUrl} />
        </section>
      </section>

      <section className="items-center p-10 rounded-lg w-full mt-5 shadow-md hover:shadow-lg border-2 border-solid border-primary">
        <h3 className="text-3xl font-medium mb-5 dark:text-slate-100">
          Gerelateerde producten
        </h3>
        <Suspense fallback="<section classname='animate-pulse border w-full h-32'></section>">
          <RelatedProducts product={productData} />
        </Suspense>
      </section>
    </>
  );
}
const structuredData = {
  "@context": "https://schema.org/",
  "@type": "Product",
  name: "GeoCeramica Patina Taupe",
  image: "productData.image.sourceUrl",
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: "606.66",
  },
};
