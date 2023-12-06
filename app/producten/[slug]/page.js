import { redirect } from "next/navigation";
import Image from "next/image";
import getProductsBySlug from "../../data/getProductBySlug";
import getProductsById from "../../data/getProductById";
import Product from "../../components/SingleProduct";
import { usePathname, useSearchParams } from "next/navigation"; 
import { PageWrapper } from "../../components/pageWrapper.tsx";

export default async function ProductPage({ params: { slug, searchParams } }) {

  const product = await getProductsBySlug(slug)

  let productData = product.product
  
  if (!product.product) {
      redirect('/404')
  }
  function removeHtmlTags(str, shouldClean=true) {
    if (shouldClean) {
      str = str.replace(/<[^>]*>/g, '');
      str = str.replace("€&nbsp;", ""); 
    }
    return str;
}

function cleanupObject(obj) {
    for (let key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        cleanupObject(obj[key]);
      } else if (typeof obj[key] === "string") {
        obj[key] = removeHtmlTags(obj[key], key !== 'description');
      }
    }
}

console.log(productData)
cleanupObject(productData)


  return (
    <>
      <PageWrapper className="w-4/5 lg:w-9/12 2xl:w-5/6 my-5">
        <Product productData={productData} />
      </PageWrapper>
    </>
  );
 
}

export async function generateMetadata({params: { slug }}) {
  const product = await getProductsBySlug(slug);
  let productNaam = product.product.name;
  return {
    title: productNaam + ' - Keramischetegelshop.nl'
  }
}
