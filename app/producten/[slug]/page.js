import GetProductAndLoad from "../../components/GetProductAndLoad";
import getProductBySlug from "../../data/getProductBySlug";

export default function ProductPage({ params: { slug, searchParams } }) {
  return (
    <>
      <GetProductAndLoad slug={slug} searchParams={searchParams} />
    </>
  );
}

export async function generateMetadata({ params: { slug } }) {
  let product = await getProductBySlug(slug);
  let huidigeKleur = product.product.attributes.nodes.find(
    (attr) => attr.name === "pa_kleur"
  ).options[0];
  const afmetingFromProduct = product.product.attributes.nodes.find(
    (node) => node.name == "pa_afmetingen"
  ).options[0];
  const afmetingMetSpaties = afmetingFromProduct
    .replace(/-x-/g, " x ")
    .replace(/-/g, ".");
  function beperkLengte(string, maxLength) {
    if (string.length <= maxLength) {
      return string; // Geen wijzigingen nodig als de string al kort genoeg is
    } else {
      var beperkteString = string.substring(0, maxLength); // Selecteer de substring vanaf index 0 tot maxLength
      var laatstePuntIndex = beperkteString.lastIndexOf(".");
      return beperkteString
        .substring(0, laatstePuntIndex + 1)
        .replace(/<\/?[^>]+(>|$)/g, ""); // Inclusief het laatste puntteken
    }
  }

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product?.product?.name + " " + afmetingMetSpaties,
    title: product?.product?.name + " " + afmetingMetSpaties,
    description: beperkLengte(product?.product?.description, 160),
    image: product?.product?.image?.sourceUrl,
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: product?.product?.price,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Keramische Tegel Shop",
      },
    },
  };
}
