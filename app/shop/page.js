import Link from "next/link";
import Image from "next/image";
import getProducts from "../data/products";
import Product from "../components/Product";
import FilterBar from "../components/FilterBar";
import { usePathname, useSearchParams } from "next/navigation";
import { split } from "postcss/lib/list";
export async function generateMetadata() {
  return {
    title: "Shop - Keramischetegelshop.nl",
  };
}
function removeEuroAndnbsp(inputText) {
  var outputText = inputText.replace(/€&nbsp;/g, '');
  const outputPrice = parseFloat(outputText)

  return outputPrice;
}
export default async function page({ searchParams }) {
  let hoeveelProducten = 1;
  const products = await getProducts(searchParams.afmetingen, searchParams.zoeken);


  const splittedProducts = [];


  products.forEach(productObj => {
      const productNode = productObj.node;
  
      // Skip if this is not a variation product.
      if (!productNode.parent) return;
  
      const colorNodes = productNode.parent.node.allPaKleurNaam?.nodes;
  
      colorNodes?.forEach(colorNode => {
          const variation = colorNode.variations.nodes[0];
          const image = variation.image ? variation.image.sourceUrl : null;
          const price = variation.price;

          const newProduct = {
              ...productNode,
              color: colorNode.name,
              image: image,
              variantId: variation.databaseId,
              productId: productNode.parent.node.productId,
              slug: `${colorNode.slug}-${productNode.slug}`,
              price: price,
          };
    
          delete newProduct.parent;
          if (!splittedProducts.some(product => product.variantId === newProduct.variantId)) {
            splittedProducts.push(newProduct);
          };
      });
  });
   



  console.log(splittedProducts)
  
  function removeHtmlTags(str) {
    str = str.replace(/<[^>]*>/g, "");
    str = str.replace("€&nbsp;", "");
    return str;
  }

  return (
    <>
      <main className="lg:w-4/5 text-white text-center grid grid-cols-4">
        <h1 className="text-3xl text-slate-900 font-bold dark:text-slate-100 row-start-1 col-span-full mt-5 mb-1">
          Shop
        </h1>
        {splittedProducts.length >= 1 ? (
          <span className="bg-[--primary] col-span-full text-white py-1 px-5 rounded-lg w-fit h-fit text-base justify-self-center">
            {splittedProducts.length} resultaten gevonden
          </span>
        ) : (
          <span className="bg-[--primary] col-span-full text-white py-3 px-5 rounded-lg w-fit h-fit text-xl justify-self-center">
            Geen resultaten gevonden
          </span>
        )}
        <aside className="mt-5 col-span-1 bg-slate-100 text-slate-950 rounded-lg py-5 flex flex-col items-center h-fit top-44 sticky">
          <span className="text-2xl">Filters</span>
          <FilterBar />
        </aside>
        <section className="mt-5 col-start-2 col-span-full grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-y-5 gap-x-7 mx-5">
          {splittedProducts.map((product, index) => (
            <Product
              product={product}
              key={Math.random(2000000)}
              afmeting={searchParams.afmetingen}
            />
          ))}
        </section>
      </main>
    </>
  );
}
