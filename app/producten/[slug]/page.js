import { redirect } from 'next/navigation'
import Image from 'next/image';
import getProductsBySlug from '@/app/data/getProductBySlug';
import Product from '@/app/components/SingleProduct';

export default async function ProductPage( { params: { slug } } ) {
    const product = await getProductsBySlug(slug)
    let productData = product.product
    
    if (!product.product) {
        redirect('/404')
    }
    function removeHtmlTags(str) {
      str = str.replace(/<[^>]*>/g, ''); // Remove HTML tags
      str = str.replace("€&nbsp;", ""); // Remove "€&nbsp;"
      return str;
    }
    function cleanupObject(obj) {
      for (let key in obj) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
          // for nested object property, recurse
          cleanupObject(obj[key]);
        } else if (typeof obj[key] === "string") {
          // for string property, remove html tags
          obj[key] = removeHtmlTags(obj[key]);
        }
      }
    }
    cleanupObject(productData)
 
    return (
    <>
      <Product productData={productData} />
    </>
    )
}
