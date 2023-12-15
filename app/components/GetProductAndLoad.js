import getProductBySlug from "../data/getProductBySlug";
import Product from "./SingleProduct";
import { PageWrapper } from "./pageWrapper.tsx";
import Head from 'next/head'
export default async function GetProductAndLoad({ slug, searchParams }) {
  let product = await getProductBySlug(slug);
  let huidigeKleur = product.product.attributes.nodes.find(
    (attr) => attr.name === "pa_kleur"
  ).options[0];
  const afmetingFromProduct = product.product.attributes.nodes.find(
    (node) => node.name == "pa_afmetingen"
  ).options[0];
  
  const pattern = /(\d+)[^\d]+(\d+)[^\d]+(\d+)/g;
  const [_, lengte, breedte, dikte] = pattern.exec(afmetingFromProduct) || [];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.product.name + " " + afmetingFromProduct.replace(/-/g, " "),
    image: product.product.image.sourceUrl,
    description: product.product.description.replace(/<[^>]+>/g, ""),
    "offers": {
      "@type": "Offer",
      "priceCurrency": "EUR",
      "url": "https://dev.keramischetegelshop.nl/producten/" + product.product.slug,
      "price": parseFloat(product?.product?.price.replace(/(&nbsp;|€)/g, "").replace(",", ".")),
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Keramische Tegel Shop",
      },
      "itemOffered": {
        "@type": "Product",
        name: product.product.name + " " + afmetingFromProduct.replace(/-/g, " "),
        image: product.product.image.sourceUrl,
        description: product.product.description.replace(/<[^>]+>/g, ""),
        width: breedte,
        height: lengte,
        thickness: dikte,
        color: huidigeKleur.charAt(0).toUpperCase()+huidigeKleur.slice(1)
      }
    }
  };
  return (
    <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      <PageWrapper className="w-4/5 lg:w-9/12 2xl:w-4/6 my-5 mx-5">
        <Product product={product} slug={slug} />
      </PageWrapper>
    </>
  );
}
