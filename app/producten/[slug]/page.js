import { redirect } from "next/navigation";
import Image from "next/image";
import getProductsBySlug from "../../data/getProductBySlug";
import getProductsById from "../../data/getProductById";
import Product from "../../components/SingleProduct";
import { usePathname, useSearchParams } from "next/navigation"; 

export default async function ProductPage({ params: { slug, searchParams } }) {
  let numbers = slug.match(/\d+/g);
  let productId = btoa('product:'+numbers[numbers.length-2]);
  let variantId = parseInt(numbers[numbers.length - 1]);
  const product = await getProductsById(productId);
  const variantString =  Buffer.from('product_variation:' + variantId).toString('base64');
  const productArray = []
  const getNodeMatch = dataObject => dataObject?.nodes?.find(n => n.variations?.nodes?.some(v => v.id == variantString))?.name;
  const newProduct = [];

  product.allPaAfmetingen.nodes.forEach(node => {
      node.variations.edges.forEach(variationEdge => {
          const isMatch = variationEdge.node.id == variantString;
          if (isMatch) {

              const afmeting = node.name;

              const attributes = {edges: product.attributes.edges.map(edge => {
                  return {
                      node: {
                          id: edge.node.id,
                          name: edge.node.name,
                          options: edge.node.options,
                      }
                  };
              })};
              const allPaKleur = getNodeMatch(product.allPaKleur);
              const allPaKleurNaam = getNodeMatch(product.allPaKleurNaam);
              const allPaMinimaleHoeveelheidM2 = getNodeMatch(product.allPaMinimaleHoeveelheidM2);
              const allPaMinimumAantal = getNodeMatch(product.allPaMinimumAantal);
              const allPaAfmetingen = getNodeMatch(product.allPaMinimumAantal);
              // Create a new product object
              let productArray = {
                  id: product.id,
                  name: product.name,
                  slug: product.slug,
                  description: product.description,
                  shortDescription: product.shortDescription,
                  attributes: attributes,
                  image: variationEdge.node.image.sourceUrl,
                  onSale: product.onSale,
                  price: variationEdge.node.price, // Use the variation's price
                  content: product.content,
                  afmeting: afmeting,
                  allPaKleur: allPaKleur,
                  allPaKleurNaam: allPaKleurNaam,
                  allPaAfmetingen: product.allPaAfmetingen,
                  allPaMinimaleHoeveelheidM2: allPaMinimaleHoeveelheidM2,
                  allPaMinimumAantal: allPaMinimumAantal,
              }; 
              // Add newProduct to the products array
              newProduct.push(productArray);
          }
      });
  });


  if (!product) {
    redirect("/404");
  }

  function removeHtmlTags(str) {
    str = str.replace(/<[^>]*>/g, "");
    str = str.replace("€&nbsp;", "");
    return str;
  }


  return (
    <>
      <Product productData={newProduct[0]} />
    </>
  );
 
}

export async function generateMetadata({params: { slug }}) {
  let numbers = slug.match(/\d+/g);
  let productId = btoa('product:'+numbers[numbers.length-2]);
  const product = await getProductsById(productId);

  return {
    title: ' - Keramischetegelshop.nl'
  }
}
