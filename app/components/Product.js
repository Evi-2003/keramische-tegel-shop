'use client'
import Link from "next/link";
import { useState } from 'react'
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart'
import Image from 'next/image'
import formatProductData from "../data/formatProductData";
export default function Product({ product, afmeting }) {
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
  function formatAfmeting(text) {
    return text.replace(/-/g, ' ');
  }
  return (
    <article key={product.id} className='flex flex-col w-full px-5 text-[--menu-tekst] rounded-2xl text-left space-y-1'>
      <Link href={"/producten/" + product.slug} aria-label={"Go to product page of " + product.name} className="hover:shadow-md hover:scale-[0.97] flex bg-[--wit] w-full h-auto items-center justify-center rounded-lg">
          <Image
              src={product.image.sourceUrl}
              quality="80"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
              width={300}
              height={300}
              priority="high"
              alt={product.image.altText || "Tegel " + product.name} 
              className="rounded-sm"
          />
      </Link>
      <div className="flex flex-col bg-slate-100 px-3 py-2 my-0 rounded-b-lg">
        <Link href={"/producten/" + product.slug} aria-label={"Go to product page of " + product.name} className="leading-6 flex text-xl text-left hover:underline justify-between items-center">
            {product.name}
        </Link>
        <span className="my-1 bg-[--primary] w-fit rounded-lg px-2 text-slate-100">{afmeting ? afmeting: formatAfmeting(product.attributes.nodes[0].options[0])}</span>
        <p>{removeHtmlTags(product.shortDescription)}</p>
        <span aria-label={"Price of " + product.name + " is €" + removeHtmlTags(product.price)} className="text-base">
            € {removeHtmlTags(product.price)}
        </span>
      </div>
</article>
  )
}
