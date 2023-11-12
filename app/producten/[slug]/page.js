import { redirect } from 'next/navigation'
import Image from 'next/image';
import getProductsBySlug from '../../data/getProductBySlug';
import Product from '../../components/SingleProduct';

export default async function ProductPage( { params: { slug, searchParams } } ) {

    console.log(searchParams)
    const product = await getProductsBySlug(slug)
    let productData = product.product
    
    if (!product.product) {
        redirect('/404')
    }
    function removeHtmlTags(str) {
      str = str.replace(/<[^>]*>/g, '');
      str = str.replace("€&nbsp;", ""); 
      return str;
    }
    function cleanupObject(obj) {
      for (let key in obj) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
          cleanupObject(obj[key]);
        } else if (typeof obj[key] === "string") {
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
