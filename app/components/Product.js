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
    <article key={product.id} className='flex flex-col w-72 text-[--menu-tekst] rounded-2xl text-left'>
      <Link href={"/producten/" + product.slug} aria-label={"Go to product page of " + product.name} className="hover:shadow-md p-5 hover:scale-[0.97] flex bg-[--wit] w-full h-auto items-center justify-center mb-5 rounded-lg">
          <Image
              src={product.image.sourceUrl}
              quality="80"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
              width={256}
              height={256}
              priority="high"
              alt={product.image.altText || "Tegel " + product.name} 
              className="h-64 w-64 rounded-sm"
          />
      </Link>
        <Link href={"/producten/" + product.slug} aria-label={"Go to product page of " + product.name} className="flex text-xl text-left hover:underline justify-between items-center">
            {product.name}
            <span aria-label={"Price of " + product.name + " is €" + removeHtmlTags(product.price)} className="text-base">
            € {removeHtmlTags(product.price)}
            </span>
        </Link>
        <p>{removeHtmlTags(product.shortDescription)}</p>
</article>
  )
}
