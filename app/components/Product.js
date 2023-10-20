'use client'
import Link from "next/link";
import { useState } from 'react'
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart'
import Image from 'next/image'
import formatProductData from "../data/formatProductData";
export default function Product({ product }) {
  const { addItem, cartDetails } = useShoppingCart()
  let productCartData = formatProductData(product)
  function removeHtmlTags(str) {
    str = str.replace(/<[^>]*>/g, ''); // Remove HTML tags
    str = str.replace("€&nbsp;", ""); // Remove "€&nbsp;"
    return str;
  }
  const { name  } = removeHtmlTags(product.name)
  const { price } = removeHtmlTags(product.price)
  const [quantity, setQuantity] = useState(1)

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const addToCart = () => {
    addItem(product, { count: quantity })
    setQuantity(1)
  }

  return (
    <article key={product.id} className='text-black flex flex-col gap-3 bg-white dark:bg-sky-900 dark:text-slate-100 rounded-xl shadow-md text-center m-5 rounded-2xl h-[200px] grid grid-cols-3'>
    <Link href={"/producten/" + product.slug} aria-label={"Go to product page of " + product.name} className="col-start-1 h-[inherit]">
        <Image
            src={product.image.sourceUrl}
            quality="50"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
            width={360} 
            height={360} 
            alt={product.image.altText} 
            className="w-full h-[inherit] object-contain"
        />
    </Link>
    <div className="py-5 flex flex-col px-5 col-start-2 col-end-4 justify-center">
        <Link href={"/producten/" + product.slug} aria-label={"Go to product page of " + product.name} className="text-2xl text-left hover:underline">
            {product.name}
        </Link>
        <p className="text-base col-span-full row-start-2 text-left my-2">{removeHtmlTags(product.shortDescription)}</p>
        <span className="text-left dark:text-slate-100 w-fit py-1 rounded-lg ptext-xl" aria-label={"Price of " + product.name + " is €" + removeHtmlTags(product.price)}>
            € {removeHtmlTags(product.price)}
        </span>

    </div>
</article>
  )
}
