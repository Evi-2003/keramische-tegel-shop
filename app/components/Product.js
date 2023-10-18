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
    <article key={product.id} className='flex text-black flex-col gap-3 bg-white p-8 rounded-xl shadow-md text-center m-5 rounded-2xl col-span-2 grid grid-cols-3'>
    <Link href={"/producten/" + product.slug} aria-label={"Go to product page of " + product.name} className="col-start-1 mr-10">
        <Image
            src={product.image.sourceUrl}
            quality="50"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
            width={360} 
            height={360} 
            alt={product.image.altText} 
            className="w-full h-full object-contain rounded-t-2xl"
        />
    </Link>
    <div className="py-5 grid grid-cols-2 col-start-2 col-span-3">
        <Link href={"/producten/" + product.slug} aria-label={"Go to product page of " + product.name} className="text-2xl col-span-3 row-start-1 text-left hover:underline">
            {product.name}
        </Link>
        <p className="text-base col-span-3 row-start-2 text-left my-2">{removeHtmlTags(product.shortDescription)}</p>
        <span className="row-start-3 col-start-1 text-left dark:text-slate-100 w-fit py-1 rounded-lg place-self-start col-span-2 text-xl self-center" aria-label={"Price of " + product.name + " is €" + removeHtmlTags(product.price)}>
            € {removeHtmlTags(product.price)}
        </span>
        <div className="flex justify-around items-center mt-4 mb-2">
            <button
                /* You will need to bind your decreaseQuantity and increaseQuantity method here */
                onClick={decreaseQuantity}
                className="hover:text-emerald-500 hover:bg-emerald-50 w-8 h-8 rounded-full transition-colors duration-500"
            >
                -
            </button>
            <span className="w-10 text-center rounded-md mx-3">{quantity}</span>
            <button
                onClick={increaseQuantity}
                className="hover:text-emerald-500 hover:bg-emerald-50 w-8 h-8 rounded-full transition-colors duration-500"
            >
                +
            </button>
        </div>
        <button
            onClick={() => addToCart(product.slug)}
            className="w-fit row-start-3 col-start-3 text-left py-1 px-5 rounded-lg text-lg bg-emerald-50 hover:bg-emerald-500 hover:text-white transition-colors duration-500 text-emerald-500 rounded-md px-5 py-2 text-center place-self-end shadow-2xl"
        > 
            Add to cart
        </button>
    </div>
</article>
  )
}
