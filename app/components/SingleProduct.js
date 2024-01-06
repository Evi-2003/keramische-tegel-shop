/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import formatProductData from "../data/formatProductData";
import Image from "next/image";
import Head from "next/head";
import CheckMarkGreen from "./CheckMark";
import optionsUrl from "./serverActionUrl.tsx";
import RelatedProducts from "./RelatedProducts";
import { usePathname, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { lazy, Suspense } from "react";
import { getRouteProps } from "next/navigation";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
// eslint-disable-next-line
export default function Product({ product, slug }) {
  let productData = product.product;
  const router = useRouter();
  function removeHtmlTags(str, shouldClean = true) {
    if (shouldClean) {
      str = str.replace(/<[^>]*>/g, "");
      str = str.replace("€&nbsp;", "");
    }
    return str;
  }
  async function quantityUrlChange(
    connection,
    path,
    searchParams,
    option,
    value,
    action
  ) {
    const params = new URLSearchParams(searchParams);
    params.set(option, value);
    const newPath =
      connection + process.env.NEXT_PUBLIC_DOMAIN + "/" + path + "?" + params;

    const routeProps = await getRouteProps(newPath);

    if (action === "replace") {
      routeProps.replace();
    } else {
      routeProps.push();
    }
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

  function cleanupObject(obj) {
    for (let key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        cleanupObject(obj[key]);
      } else if (typeof obj[key] === "string") {
        obj[key] = removeHtmlTags(obj[key], key !== "description");
      }
    }
  }
  let nodeProduct3d = productData.attributes.nodes.find(
    (node) => node.name == "pa_is3d"
  );
  let isThisProduct3d = nodeProduct3d ? nodeProduct3d.options[0] : true;
  cleanupObject(productData);
  console.log(isThisProduct3d);
  if (isThisProduct3d === "nee") {
    console.log("Dit product is niet 3d");
    isThisProduct3d = false;
  } else if (isThisProduct3d !== "nee") {
    isThisProduct3d = true;
  }
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
      router.push("?hoeveelheid=" + (quantity - 1));
    }
  };
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.textContent);
    if (!isNaN(newQuantity) && newQuantity >= minHoeveelheidTegels) {
      setQuantity(newQuantity);
      console.log("aa");
      router.push("?hoeveelheid=" + newQuantity);
    } else {
      alert("Minimum hoeveelheid tegels is " + minHoeveelheidTegels);
      event.target.textContent = parseInt(minHoeveelheidTegels);
      setQuantity(parseInt(minHoeveelheidTegels));
      router.push("?hoeveelheid=" + minHoeveelheidTegels);
    }
  };
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    router.push("?hoeveelheid=" + (quantity + 1));
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
    .replace(/-/g, ".")
    .replace(/cm/g, " cm");
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
  let serieNaam = productData.attributes.nodes.find(
    (attr) => attr.name === "pa_serienaam"
  ).options[0];
  let currentColorAttr = productData.attributes.nodes.find(
    (attr) => attr.name === "pa_kleur"
  ).options[0];

  for (let i = 0; i < productData.variantAttributes.length; i++) {
    if (
      productData.variantAttributes[i].name === "pa_serienaam" &&
      productData.variantAttributes[i].value === serieNaam
    ) {
      let colorAttr = productData.variantAttributes.find(
        (attr) =>
          attr.name === "pa_kleur-naam" &&
          attr.productId === productData.variantAttributes[i].productId
      );
      if (colorAttr && colorAttr.value !== currentColorAttr) {
        if (!kleuren.some((kleur) => kleur.kleur === colorAttr.value)) {
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
  const m2SizeTotalOrder = m2SizeCalculated * quantity;
  const prijsOpFormaat = removeHtmlTags(productData.price);
  console.log("Totale M2 Order: " + m2SizeTotalOrder);
  console.log("Prijs per tegel: " + prijsOpFormaat.replace(",", "."));
  const prijsinFloat =
    parseFloat(prijsOpFormaat.replace(",", ".")) * m2SizeTotalOrder; // Prijs
  const totalePrijs = prijsinFloat.toFixed(2).toString().replace(".", ",");

  const totalePrijsZonderBtwinFloat = parseFloat(
    prijsinFloat - (prijsinFloat / 100) * 21
  ).toFixed(2);
  const totalePrijsZonderBtw = parseFloat(totalePrijsZonderBtwinFloat)
    .toFixed(2)
    .toString()
    .replace(".", ",");
  const shortenToString = (str) => {
    let parts = str.split(".");
    return parts.length >= 3 ? parts.slice(0, 2).join(".") : str;
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
          className="row-start-1 col-start-1 col-span-2 w-10/12 lg:w-11/12 2xl:w-4/5 justify-self-center shadow-lg object-cover hover:scale-105"
        ></Image>
        <aside className="row-start-2 grid grid-cols-2 2xl:w-2/3 auto-rows-min tempalte-col lg:row-start-1 lg:col-start-3 lg:col-span-3 m-5 md:mx-10 justify-start self-start text-left space-y-1 rounded-lg gap-1">
          <h1 className="text-[1.70rem] font-semibold  row-start-1 col-span-full">
            {productData.name} <br aria-hidden="true" />
            <span className="-mt-5 flex w-fit border-[2px] border-[--primary] text-slate-950 dark:text-slate-50 py-1 px-5 rounded-lg text-base shadow-lg font-medium">
              {afmetingMetSpaties}
            </span>
          </h1>

          <p className="hidden md:block text-base row-start-2 col-span-full text-ellipsis overflow-hidden line-clamp-6">
            <span className="text-lg font-medium ">
              De {productData.name} in het kort:
            </span>
            <br aria-hidden="true" />
            {productData.shortDescription &&
              shortenToString(removeHtmlTags(productData.shortDescription))}
            .<br aria-hidden="true"></br>
            <a href="#lees-meer" className="font-medium hover:underline">
              Lees meer
            </a>
          </p>

          <h3 className="text-lg font-medium  col-start-1 col-span-2 row-start-3">
            Aantal (m2)
          </h3>
          <span className="col-start-1 row-start-4 text-lg border-2 border-solid border-[--primary] w-fit rounded-lg  px-5 py-[0.15em] flex items-center self-start m-0">
            {(m2SizeCalculated * quantity).toFixed(2)}
          </span>
          <h3 className="col-span-2 text-lg font-medium  row-start-3 col-start-2">
            Aantal (tegels)<br aria-hidden="true"></br>
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
              className="w-10 text-center rounded-md hover:underline hover:cursor-pointer underline underline-offset-4"
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
            className="col-start-1 text-left row-start-7 bg-transparent text-slate-950 dark:text-slate-100 rounded-lg border-2 border-[--primary] border-solid py-2 w-5/6 text-sm md:w-fit px-1 md:px-5 hover:scale-95 shadow-lg hover:cursor-pointer "
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

          <h3 className="text-lg font-medium  lg:col-start-2 row-start-6">
            Kleuren
          </h3>
          <select
            id="kleurSelect"
            className="col-start-2 w-5/6 md:w-fit row-start-7 bg-transparent text-slate-950 dark:text-slate-100 rounded-lg border-2 border-[--primary] border-solid py-2 px-5 hover:scale-95 shadow-lg hover:cursor-pointer"
            onChange={handleChange}
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

          <dl className="col-start-1 col-span-2 row-start-[8] text-lg grid grid-cols-2 grid-rows-auto pb-2">
            <dt className="col-start-1 row-start-1">Totale prijs</dt>
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
              € {totalePrijs} <span className="text-xs">incl. BTW</span>
            </dd>
            <dt className="col-span-2 row-start-1">Prijs per m2</dt>
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
              € {prijsOpFormaat}
            </dd>
          </dl>
          <p className="border px-4 rounded-lg col-span-full md:col-start-1 row-start-[10] w-fit text-slate-950 font-medium dark:text-slate-50 flex items-center justify-center gap-x-2">
            <span class="relative flex h-3 w-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            Op voorraad
          </p>
          <Link
            href="tel:0317 765 005"
            aria-label="0317 765 005"
            className="hover:scale-95 hover:shadow-lg border px-4 py-1 rounded-lg md:col-start-2 col-span-full row-start-[11] md:row-start-[10] w-fit text-slate-950 font-medium dark:text-slate-50 flex items-center justify-center gap-x-2"
          >
            Vragen? Bel 0317 765 005
          </Link>
          <a
            onClick={() => addToCart(productData)}
            href="/winkelmand"
            id="lees-meer"
            className="flex top-2 relative col-span-full row-start-[12] md:row-start-[11] text-left px-5 bg-green-600 dark:bg-green-800 text-white font-semibold w-fit py-1 rounded-lg text-lg hover:scale-95 shadow-lg hover:shadow-xl"
          >
            Toevoegen aan winkelmand
          </a>
        </aside>
      </article>
      <section className="w-full mt-5 flex flex-col sm:flex-row justify-center">
        <ul className="flex flex-col sm:flex-row items-center justify-center gap-x-32 gap-y-8 text-xl py-5 dark:text-slate-50">
          <li className="flex justify-center items-center">
            <svg
              width="512pt"
              height="512pt"
              className="w-12 h-12 dark:fill-white"
              version="1.1"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path d="m313.13 170.36c-12.227-0.52344-24.027 4.5391-32.078 13.758 23.625 12.484 39.875 37.121 40.383 65.492v-0.003907c7.6055-1.9492 14.477-6.082 19.766-11.887 5.2891-5.8047 8.7695-13.023 10.008-20.777 1.4844-9.3359-0.35938-18.891-5.2109-27.004-4.8477-8.1094-12.395-14.262-21.316-17.375-3.7227-1.293-7.6133-2.0352-11.551-2.2031z" />
                <path
                  d="m311.33 125.01c-2.7812 0.042969-5 2.332-4.957 5.1133v14.98c-0.019531 1.3477 0.50391 2.6445 1.4492 3.6055 0.94531 0.96094 2.2383 1.5 3.5859 1.5s2.6406-0.53906 3.5898-1.5c0.94531-0.96094 1.4688-2.2578 1.4492-3.6055v-14.98c0.019531-1.3633-0.51172-2.6758-1.4766-3.6406-0.96484-0.96094-2.2773-1.4961-3.6406-1.4727z"
                  fill-rule="evenodd"
                />
                <path
                  d="m397.07 210.59c-0.042968-2.7852-2.3359-5.0039-5.1172-4.9609h-14.977c-1.3516-0.023438-2.6562 0.49609-3.6172 1.4453-0.96484 0.94531-1.5078 2.2422-1.5078 3.5938 0 1.3516 0.54297 2.6445 1.5078 3.5938 0.96094 0.94531 2.2656 1.4648 3.6172 1.4414h14.977c1.3633 0.023437 2.6797-0.50781 3.6406-1.4727 0.96484-0.96484 1.4961-2.2773 1.4766-3.6406z"
                  fill-rule="evenodd"
                />
                <path
                  d="m255.99 150.21c-2.0469 0.011718-3.8828 1.2539-4.6484 3.1484-0.76953 1.8945-0.31641 4.0625 1.1445 5.4922l9.9766 9.9766c0.9375 0.98047 2.2305 1.543 3.5859 1.5586s2.6641-0.51562 3.6211-1.4727c0.96094-0.96094 1.4922-2.2656 1.4766-3.6211-0.015626-1.3594-0.57813-2.6523-1.5586-3.5859l-9.9766-9.9766v-0.003906c-0.95312-0.97266-2.2617-1.5195-3.6211-1.5156z"
                  fill-rule="evenodd"
                />
                <path
                  d="m370.34 151.63c-0.95703-0.93359-2.2461-1.4492-3.5859-1.4297-1.3359 0.019531-2.6094 0.57031-3.543 1.5312l-9.9766 9.9766v-0.003906c-0.96094 0.94531-1.5039 2.2305-1.5117 3.5781-0.003906 1.3438 0.52734 2.6367 1.4766 3.5898 0.95312 0.94922 2.2461 1.4844 3.5898 1.4766 1.3477-0.007812 2.6367-0.55078 3.5781-1.5117l9.9766-9.9727-0.003906-0.003906c0.98047-0.94922 1.5352-2.2539 1.5352-3.6172 0-1.3633-0.55469-2.668-1.5352-3.6172z"
                  fill-rule="evenodd"
                />
                <path
                  d="m356.75 250.91c-2.0508 0-3.8984 1.2461-4.6719 3.1484-0.76953 1.9023-0.30469 4.082 1.168 5.5117l9.9766 9.9766h0.003906c0.93359 0.98047 2.2266 1.5391 3.582 1.5547 1.3555 0.015625 2.6602-0.51562 3.6211-1.4766 0.95703-0.95703 1.4883-2.2617 1.4766-3.6172-0.015625-1.3555-0.57812-2.6484-1.5586-3.5859l-9.9766-9.9766c-0.94922-0.98047-2.2539-1.5352-3.6211-1.5352z"
                  fill-rule="evenodd"
                />
                <path d="m245.93 185.47c-12.668 0.011719-25.059 3.6914-35.672 10.602-10.617 6.9102-19 16.746-24.137 28.324-5.7969-2.4062-12.008-3.6484-18.285-3.6602-12.691 0-24.867 5.043-33.844 14.02-8.9766 8.9766-14.016 21.148-14.016 33.844 0 12.691 5.0391 24.867 14.016 33.844 8.9766 8.9766 21.152 14.02 33.844 14.016h17.711c0.3125-0.64453 0.55859-1.3516 0.88672-1.9883 1.7734-3.4453 3.8906-6.6602 5.9648-9.5469 4.1484-5.7695 8.2461-10.312 8.2461-10.312l7.5-8.3438 7.5 8.3438s4.0781 4.543 8.2266 10.312c2.0742 2.8828 4.2109 6.1016 5.9844 9.5469 0.32813 0.63672 0.57422 1.3398 0.88672 1.9883h15.191-0.003907c17.371 0.003907 34.027-6.8984 46.312-19.18 12.281-12.285 19.184-28.945 19.18-46.312 0.003906-17.371-6.8984-34.031-19.18-46.312-12.285-12.285-28.941-19.184-46.312-19.184z" />
                <path d="m273.63 366.84c0 8.3477-6.7656 15.113-15.113 15.113-8.3477 0-15.113-6.7656-15.113-15.113s15.113-25.191 15.113-25.191 15.113 16.844 15.113 25.191z" />
                <path d="m172.87 366.84c0 8.3477-6.7656 15.113-15.113 15.113-8.3477 0-15.113-6.7656-15.113-15.113s15.113-25.191 15.113-25.191 15.113 16.844 15.113 25.191z" />
                <path d="m223.25 326.54c0 8.3477-6.7656 15.113-15.113 15.113s-15.113-6.7656-15.113-15.113 15.113-25.191 15.113-25.191 15.113 16.844 15.113 25.191z" />
              </g>
            </svg>
            Kleurvast
          </li>
          <li className="flex justify-center items-center">
            <svg
              width="512pt"
              className="w-5 h-5 mr-2 dark:fill-white"
              height="512pt"
              version="1.1"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path d="m43.84 56.48c-4.6406-1.1211-9.7617-0.16016-13.602 2.8789-3.8398 2.8789-6.0781 7.5195-6.2383 12.32-1.1211 50.238 1.7617 95.52 9.1211 136.32h206.88v-179.52c-33.602 10.879-139.2 42.078-196.16 28z" />
                <path d="m488 71.68c-0.16016-4.8008-2.3984-9.4414-6.2383-12.32-3.8398-3.0391-8.9609-4-13.602-2.8789-57.121 13.922-162.4-17.121-196.16-27.84v179.36h206.88c7.3594-40.801 10.238-86.078 9.1211-136.32z" />
                <path d="m39.84 240c27.199 112.64 91.52 188.8 200.16 241.92v-241.92z" />
                <path d="m272 240v241.92c108.64-53.121 172.96-129.28 200.16-241.92z" />
              </g>
            </svg>
            Slijtvast
          </li>
          <li className="flex flex-col sm:flex-row justify-center items-center">
            <svg
              width="512pt"
              className="w-8 h-8 mr-2 dark:fill-white"
              height="512pt"
              version="1.1"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path d="m377.48 474.76 19.594-51.852h-116.88l19.551 51.852z" />
                <path d="m399.13 98.398h-121.02v315.2h121.02zm-23.648 111.05v129.77c0 1.2344-0.48828 2.418-1.3633 3.293-0.87109 0.87109-2.0547 1.3633-3.2891 1.3633h-64.418c-2.5703 0-4.6562-2.0859-4.6562-4.6562v-166.45c0-2.5703 2.0859-4.6562 4.6562-4.6562h64.418c1.2344 0 2.418 0.49219 3.2891 1.3633 0.875 0.875 1.3633 2.0586 1.3633 3.293z" />
                <path d="m397.08 89.09-19.594-51.852h-77.73l-19.551 51.852z" />
                <path d="m311.06 177.48h55.062v27.367h-55.062z" />
                <path d="m311.06 307.2h55.062v27.367h-55.062z" />
                <path d="m311.06 297.89h55.109v-83.781h-55.109zm27.555-62.836c5.1484 0 10.086 2.043 13.727 5.6836s5.6836 8.5781 5.6836 13.727c0 5.1484-2.043 10.082-5.6836 13.723s-8.5781 5.6875-13.727 5.6875c-5.1484 0-10.082-2.0469-13.723-5.6875s-5.6875-8.5742-5.6875-13.723c0-5.1484 2.0469-10.086 5.6875-13.727s8.5742-5.6836 13.723-5.6836z" />
                <path d="m348.72 254.46c0 5.5781-4.5234 10.098-10.102 10.098-5.5781 0-10.098-4.5195-10.098-10.098s4.5195-10.102 10.098-10.102c5.5781 0 10.102 4.5234 10.102 10.102" />
                <path d="m128.56 455.36h-15.688v19.406h101.24v-437.52h-101.24v19.41l36.074-0.003907c2.5703 0 4.6562 2.0859 4.6562 4.6562 0 2.5703-2.0859 4.6523-4.6562 4.6523h-36.074v26.066h15.688c2.5703 0 4.6562 2.0859 4.6562 4.6562 0 2.5703-2.0859 4.6523-4.6562 4.6523h-15.688v26.113h15.688c2.5703 0 4.6562 2.082 4.6562 4.6562 0 2.5703-2.0859 4.6523-4.6562 4.6523h-15.688v26.16h36.074c2.5703 0 4.6562 2.082 4.6562 4.6523s-2.0859 4.6562-4.6562 4.6562h-36.074v26.066h15.688c2.5703 0 4.6562 2.082 4.6562 4.6523s-2.0859 4.6562-4.6562 4.6562h-15.688v26.062h15.688c2.5703 0 4.6562 2.0859 4.6562 4.6562s-2.0859 4.6562-4.6562 4.6562h-15.688v26.066l36.074-0.003906c2.5703 0 4.6562 2.0859 4.6562 4.6562s-2.0859 4.6562-4.6562 4.6562h-36.074v26.113h15.688v-0.003906c2.5703 0 4.6562 2.0859 4.6562 4.6562s-2.0859 4.6523-4.6562 4.6523h-15.688v26.02h15.688c2.5703 0 4.6562 2.0859 4.6562 4.6562s-2.0859 4.6523-4.6562 4.6523h-15.688v26.066h36.074c2.5703 0 4.6562 2.0859 4.6562 4.6562s-2.0859 4.6523-4.6562 4.6523h-36.074v26.113h15.688c2.5703 0 4.6562 2.082 4.6562 4.6523 0 2.5703-2.0859 4.6562-4.6562 4.6562h-15.688v26.066h15.688c2.5703 0 4.6562 2.082 4.6562 4.6523 0 2.5703-2.0859 4.6562-4.6562 4.6562z" />
              </g>
            </svg>
            Maatvast
          </li>
          <li className="flex justify-center items-center">
            <svg
              width="512pt"
              height="512pt"
              className="w-8 h-8 mr-2 dark:fill-white"
              version="1.1"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m395.7 234.93h83.02v-196.53c0-2.8281-2.293-5.1211-5.1211-5.1211h-435.2c-2.8281 0-5.1211 2.293-5.1211 5.1211v185.27h113.13c4.2422 0 7.6797 3.4414 7.6797 7.6797 0 4.2383-3.4375 7.6797-7.6797 7.6797l-113.12 0.003906v111.71h75.094c4.2422 0 7.6797 3.4414 7.6797 7.6797s-3.4375 7.6797-7.6797 7.6797h-75.094v107.5c0 2.8281 2.293 5.1211 5.1211 5.1211h435.2c2.8281 0 5.1211-2.293 5.1211-5.1211l-0.003906-188.7h-99.945c-4.2383 0-7.6797-3.4414-7.6797-7.6797s3.4414-7.6797 7.6797-7.6797h99.945v-19.25h-83.02c-4.2383 0-7.6797-3.4414-7.6797-7.6797-0.003906-4.2383 3.4375-7.6797 7.6797-7.6797zm-60.547-154.82h70.215c4.2383 0 7.6797 3.4375 7.6797 7.6797 0 4.2422-3.4414 7.6797-7.6797 7.6797h-70.215c-4.2383 0-7.6797-3.4375-7.6797-7.6797 0-4.2422 3.4414-7.6797 7.6797-7.6797zm-197.56 69.562h35.555c4.2422 0 7.6797 3.4375 7.6797 7.6797 0 4.2422-3.4375 7.6797-7.6797 7.6797h-35.555c-4.2422 0-7.6797-3.4375-7.6797-7.6797 0-4.2422 3.4375-7.6797 7.6797-7.6797zm-39.836 0h18.32c4.2422 0 7.6797 3.4375 7.6797 7.6797 0 4.2422-3.4375 7.6797-7.6797 7.6797h-18.32c-4.2422 0-7.6797-3.4375-7.6797-7.6797 0-4.2422 3.4375-7.6797 7.6797-7.6797zm-27.57 15.359c-4.2422 0-7.6797-3.4375-7.6797-7.6797 0-4.2422 3.4375-7.6797 7.6797-7.6797h7.5859c4.2422 0 7.6797 3.4375 7.6797 7.6797 0 4.2422-3.4375 7.6797-7.6797 7.6797zm125.13 37h-105.41c-4.2422 0-7.6797-3.4375-7.6797-7.6797 0-4.2422 3.4375-7.6797 7.6797-7.6797h105.41c4.2422 0 7.6797 3.4375 7.6797 7.6797 0 4.2422-3.4375 7.6797-7.6797 7.6797zm97.109 208.02h-10.496c-4.2383 0-7.6797-3.4414-7.6797-7.6797 0-4.2383 3.4414-7.6797 7.6797-7.6797h10.496c4.2383 0 7.6797 3.4414 7.6797 7.6797 0.003906 4.2383-3.4375 7.6797-7.6797 7.6797zm116.58-6.6172c0 4.2383-3.4414 7.6797-7.6797 7.6797h-83.027c-4.2383 0-7.6797-3.4414-7.6797-7.6797 0-4.2383 3.4414-7.6797 7.6797-7.6797h83.023c4.2422 0 7.6836 3.4414 7.6836 7.6797zm-37.105-39.863c4.2383 0 7.6797 3.4414 7.6797 7.6797s-3.4414 7.6797-7.6797 7.6797h-54.379c-4.2383 0-7.6797-3.4414-7.6797-7.6797s3.4414-7.6797 7.6797-7.6797zm-60.434-234.89c-4.2383 0-7.6797-3.4375-7.6797-7.6797 0-4.2422 3.4414-7.6797 7.6797-7.6797h121.86c4.2383 0 7.6797 3.4375 7.6797 7.6797 0 4.2422-3.4414 7.6797-7.6797 7.6797z" />
            </svg>
            Krasbestendig
          </li>
        </ul>
      </section>
      <section className="dark:text-slate-100 md:space-x-5 w-full flex md:flex-row flex-col">
        <section className="overflow-auto flex-1 inline-flex items-center shadow-md hover:shadow-lg border-2 border-solid border-primary p-10 rounded-lg mt-5 flex-col justify-items-center md:w-2/3">
          <h2 className="text-2xl font-medium mb-2 w-full text-left">
            Over de {productData.name}
          </h2>
          <div
            dangerouslySetInnerHTML={{ __html: productData.description }}
          ></div>
        </section>
        {isThisProduct3d ? (
          <section className="md:w-1/3 h-96 md:min-h-96In inline-flex items-center p-10 rounded-lg mt-5 flex-col justify-items-center shadow-md hover:shadow-lg border-2 border-solid border-primary relative">
            <h3 className="text-3xl font-medium mb-5 text-slate-950 dark:text-slate-100">
              Product in 3D
            </h3>
            <svg
              className="w-10 h-10 absolute right-0 top-0 m-3 dark:fill-white"
              version="1.1"
              viewBox="0 0 1200 1200"
              xmlns="https://www.w3.org/2000/svg"
            >
              <path d="m599.73 97.457c-5.2266 0.0625-10.191 2.3047-13.695 6.1875l-80.566 64.672c-3.875 3.125-6.3516 7.6562-6.8828 12.605-0.53516 4.9492 0.92188 9.9062 4.043 13.781 3.125 3.875 7.6602 6.3516 12.605 6.8828 4.9492 0.53125 9.9062-0.92188 13.781-4.0469l52.148-41.895v184.46l-312.23 176.59c-2.8906 1.6328-5.2969 4.0078-6.9688 6.8789-1.6758 2.8672-2.5547 6.1289-2.5547 9.4531h-0.035156v357.97l-159.89 92.25 10.254-66.246v-0.003906c0.96094-5.6445-0.71094-11.414-4.5352-15.676-3.8242-4.2578-9.3828-6.5391-15.094-6.1875-4.3359 0.25781-8.4492 2.0117-11.633 4.9648-3.1875 2.9492-5.25 6.918-5.8359 11.223l-16.188 104.92v-0.003906c-0.28906 1.8945-0.28906 3.8203 0 5.7109 0.09375 0.58203 0.21875 1.1562 0.36719 1.7227 0.74609 2.9688 2.2031 5.707 4.2461 7.9844 0.47266 0.51562 0.97656 1.0039 1.5039 1.4648 1.1758 1.0391 2.4805 1.9258 3.8789 2.6367 0.27734 0.14844 0.55859 0.29297 0.84375 0.42578 0.035156 0.011719 0.074219 0.023438 0.10938 0.039062 0.27734 0.12109 0.55859 0.24219 0.84375 0.35156 0.32422 0.15234 0.65625 0.29297 0.98828 0.42578l97.961 38.086c4.6758 1.9492 9.9375 1.9297 14.598-0.058594 4.6562-1.9844 8.3125-5.7695 10.141-10.492 1.8281-4.7227 1.6719-9.9844-0.43359-14.59-2.1094-4.6055-5.9844-8.1641-10.754-9.8672l-62.512-24.242 160.07-92.395 312.41 176.7c5.7539 3.2773 12.812 3.2773 18.566 0l312.34-176.66 160.07 92.324-62.438 24.281v-0.003907c-4.7656 1.7031-8.6445 5.2617-10.75 9.8672-2.1055 4.6055-2.2617 9.8633-0.43359 14.586s5.4844 8.5078 10.141 10.496c4.6562 1.9844 9.9219 2.0078 14.594 0.058594l98.293-38.23h-0.003906c0.81641-0.28906 1.6133-0.63281 2.3828-1.0273 0.039062-0.011719 0.074219-0.027343 0.11328-0.039062 0.52734-0.26953 1.0391-0.5625 1.5391-0.87891 0.023438-0.011718 0.046876-0.023437 0.070313-0.035156 1.0234-0.66406 1.9805-1.4219 2.8555-2.2695 0.011718-0.011719 0.023437-0.023437 0.035156-0.035156s0.027344-0.023438 0.039062-0.035157c0.42188-0.42187 0.82422-0.86328 1.207-1.3203 0.023437-0.023438 0.046875-0.046875 0.070312-0.070312 0.375-0.44531 0.73047-0.91016 1.0625-1.3906 0.023438-0.046874 0.046875-0.09375 0.070313-0.14062 0.32812-0.48438 0.63672-0.98828 0.91797-1.5 0.023437-0.050782 0.046874-0.097657 0.070312-0.14453 0.57031-1.0625 1.0352-2.1758 1.3906-3.3281v-0.039062c0.011719-0.023438 0.023437-0.046875 0.035156-0.070313 0.53516-1.7578 0.80469-3.5859 0.80859-5.4219v-0.14062c-0.011719-0.58594-0.050781-1.1758-0.11328-1.7578v-0.14062c-0.03125-0.29297-0.070313-0.58984-0.11328-0.87891l-0.14844-0.99219v-0.070313l-16.078-103.86c-0.64062-4.7266-3.0547-9.0273-6.7578-12.035-3.6992-3.0078-8.4062-4.4922-13.164-4.1523-5.2773 0.37891-10.148 2.9727-13.414 7.1367-3.2617 4.1641-4.6172 9.5117-3.7266 14.727l10.145 66.211-159.78-92.211v-357.97h-0.035157c0-3.3203-0.87891-6.582-2.5508-9.4531-1.6758-2.8711-4.0781-5.2422-6.9727-6.8789l-312.38-176.7v-184.46l52.293 42.004c5.2227 4.207 12.289 5.3086 18.543 2.8906 6.25-2.418 10.738-7.9883 11.773-14.613 1.0312-6.625-1.5469-13.297-6.7695-17.5l-81.078-65.074v-0.003906c-3.582-3.7422-8.5508-5.8398-13.734-5.7891zm0.25781 275.17 283.74 160.4-283.74 160.58-283.74-160.58zm-303.11 192.55 284.29 160.8v325.67l-284.29-160.8zm606.26 0v325.64l-284.44 160.91v-325.64z" />
            </svg>

            <ThreejsProduct imageUrl={productData.image.sourceUrl} />
          </section>
        ) : (
          <section className="gap-y-5 md:w-1/3 h-96 md:h-fit inline-flex items-center p-10 rounded-lg mt-5 flex-col justify-items-center justify-center shadow-md hover:shadow-lg border-2 border-solid border-primary relative">
            <iframe
              frameborder="no"
              className="h-[164px]"
              title="Bekijk onze reviews via 5sterrenspecialist.nl"
              allowtransparency=""
              src="https://www.5sterrenspecialist.nl/widget.html?hash=43db16322af3ee96ea945c67bd694b71&type=reviews&webshop-or-regular=webshop&logo-position=top&size=large&logo-color=blue&background=white&border=1"
            ></iframe>
            <ul className="text-lg items-center justify-center">
              <li className="flex w-full items-center dark:text-slate-50">
                <CheckMarkGreen />{" "}
                <a
                  href="https://maps.app.goo.gl/FYbZueE6XBV4nC6x7"
                  target="_blank"
                  aria-label="Grote Showtuin - Open de routebeschrijving naar Nudetuin / Keramische tegel shop"
                  class="hover:underline "
                >
                  Grote Showtuin
                </a>
              </li>
              <li className="hidden md:flex  w-full text-left items-center dark:text-white ">
                <CheckMarkGreen /> Complete tuininrichting
              </li>
              <li className="hidden md:flex  w-full text-left items-center dark:text-slate-50">
                <CheckMarkGreen /> Verkoop, aanleg en montage
              </li>
              <li className="flex  w-full text-left items-center dark:text-slate-50">
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
            </ul>
          </section>
        )}
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
