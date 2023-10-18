'use client'
import Link from "next/link";
import { useState } from 'react'
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart'
import formatProductData from "../data/formatProductData";
import Image from 'next/image'
export default function Product({ productData }) {
  const { addItem, cartDetails } = useShoppingCart()
  const [quantity, setQuantity] = useState(1)
  function removeHtmlTags(str) {
    str = str.replace(/<[^>]*>/g, ''); // Remove HTML tags
    str = str.replace("€&nbsp;", ""); // Remove "€&nbsp;"
    return str;
  }
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }
  const productFormattedData = formatProductData(productData)
 
  const addToCart = () => {
    addItem(productFormattedData[0], { count: quantity })
    setQuantity(1)

  }

  return (
    <main className='w-2/3'>
        <article className='grid grid-cols-2 w-full h-fit p-10' key={productData.id}>
        <Image src={productData.image.sourceUrl} alt={productData.image.altText} width={256} height={256} className='row-span-full col-start-1 w-full h-ful object-cover rounded-2xl'></Image>
        <aside className='flex flex-col col-start-2 m-10 justify-start self-start text-left space-y-5'>
            <h1 className='text-5xl ml-5 dark:text-slate-100'>{productData.name}</h1>
            <p className='ml-5 text-xl dark:text-slate-100'>{removeHtmlTags(productData.shortDescription)}</p>
            <span className="text-left bg-sky-950 dark:bg-sky-800 text-white px-5 py-1 ml-5 dark:text-slate-100 w-fit py-1 rounded-lg text-xl" aria-label={"Prijs van " + productData.name + " is €" + removeHtmlTags(productData.price)}>€ {removeHtmlTags(productData.price)}</span>
            <a onClick={() => addToCart(productData)} className="text-left bg-sky-600 text-white px-5 py-1 ml-5 dark:text-slate-100 w-fit py-1 rounded-lg text-2xl hover:scale-95 shadow-lg hover:shadow-xl">Toevoegen aan winkelmand</a>
        </aside>
        </article>
  </main>  
  )
}
