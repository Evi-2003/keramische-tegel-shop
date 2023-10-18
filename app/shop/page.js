import Link from "next/link";
import Image from 'next/image'
import getProducts from "../data/products";
import Product from "../components/Product";
export default async function page(){
    const products = await getProducts()

    
      function removeHtmlTags(str) {
        str = str.replace(/<[^>]*>/g, ''); // Remove HTML tags
        str = str.replace("€&nbsp;", ""); // Remove "€&nbsp;"
        return str;
      }
    
    return(
        <>
     
            <main className="w-2/3 text-white m-5 text-center grid grid-cols-6">
                <h1 className="text-3xl text-slate-900 font-bold dark:text-slate-100 row-start-1 col-span-full">Shop</h1>
                {
                products.map(( product, index ) => (
                  <Product product={product} key={product.id}/>
                ))
                }
            </main>
            
        </>
    )
}