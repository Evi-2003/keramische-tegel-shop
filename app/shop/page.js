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
     
            <main className="w-3/5 text-white text-center">
                <h1 className="text-3xl text-slate-900 font-bold dark:text-slate-100 row-start-1 col-span-full my-5">Shop</h1>
                <section className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-24 2xl:grid-cols-4 auto-cols-man justify-items-center gap-y-5">
                  
                {
                products.map(( product, index ) => (
                  console.log(product),
                  <Product product={product} key={product.id}/>
                ))
                }
                </section>
            </main>
            
        </>
    )
}