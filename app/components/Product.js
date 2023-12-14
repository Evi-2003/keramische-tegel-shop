import Link from "next/link";
import Image from "next/image";
import formatProductData from "../data/formatProductData";

export default function Product({ product, afmeting }) {
  let productCartData = formatProductData(product);
  function removeHtmlTags(str) {
    if (typeof str === "string") {
      str = str.replace(/<[^>]*>/g, "");
      str = str.replace("€&nbsp;", "");
      return str;
    }
  }
  const { name } = product.name;

  function removeText(str) {
    var re = new RegExp("product_variation:", "g");
    return str.replace(re, "");
  }

  let productId = removeText(atob(product.id));
  const afmetingFromProduct = product.attributes.nodes.find(
    (node) => node.name == "pa_afmetingen"
  ).options[0];
  const afmetingMetSpaties = afmetingFromProduct.replace(/-x-/g, " x ");

  return (
    
    <article
      key={product.id}
      className="product-card flex flex-col w-full h-full rounded-2xl text-left transform transition hover:scale-105"
    >
      <Link
        href={"/producten/" + product.slug}
        aria-label={"Ga naar productpagina van " + product.name}
        className="product-image flex bg-white w-full h-auto items-center justify-center rounded-lg relative"
      >
        <Image
          src={product.image.sourceUrl}
          quality="60"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
          width={300}
          height={300}
          priority="high"
          alt={"Afbeelding van tegel " + product.name}
          className="product-image rounded-sm w-full"
        />

        <span
          aria-label={"Prijs van " + product.name + " is €" + product.price}
          className="product-price absolute bg-white text-black font-semibold items-center px-2 py-1 rounded-lg bottom-0 right-0 m-4 text-sm"
        >
          € {removeHtmlTags(product.price)}
        </span>

        <span className="product-dimension absolute left-0 bottom-0 m-4 px-2 py-1 rounded-lg bg-white text-black font-semibold text-xs">
          {afmetingMetSpaties}
        </span>
      </Link>

      <div className="product-details flex flex-col justify-between border-2 border-solid border-primary border-t-0 px-3 py-2 my-0 rounded-b-lg h-full min-h-[4.5rem] pb-5 md:pb-0">
        <Link
          href={"/producten/" + product.slug}
          aria-label={"Ga naar productpagina van " + product.name}
          className="text-slate-900 dark:text-slate-100  product-name flex text-xl 2xl:text-lg text-left hover:underline "
        >
          {product.name}
        </Link>
      </div>
    </article>
  );
}
