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
    if(typeof str === 'string'){
      str = str.replace(/<[^>]*>/g, '');
      str = str.replace("€&nbsp;", ""); 
      return str;
    }
  }
  const { name  } = product.name

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
  function removeText(str) {
    var re = new RegExp('product_variation:', 'g');
    return str.replace(re, '');
}

let productId = removeText(atob(product.id))

  return (
    <article key={product.id} className='hover:shadow-md flex flex-col w-full text-[--menu-tekst] rounded-2xl text-left hover:scale-95'>
      <Link href={"/producten/" + product.slug + '-' + product.productId + '-' + product.variantId} aria-label={"Go to product page of " + product.name} className="flex bg-[--wit] w-full h-auto items-center justify-center rounded-lg">
          <Image
              src={product.image}
              quality="80"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
              width={300}
              height={300}
              priority="high"
              alt={"Afbeelding van tegel " + product.name} 
              className="rounded-sm w-full"
          />
      </Link>
      <div className="flex flex-col bg-slate-100 px-3 py-2 my-0 rounded-b-lg h-full">
        <Link href={"/producten/" + product.slug + '-' + product.productId + '-' + product.variantId} aria-label={"Go to product page of " + product.name} className="mb-1 leading-6 flex text-xl text-left hover:underline justify-between items-center">
            {product.name + " " + product.color}
        </Link>
        <span aria-label={"Price of " + product.name + " is €" + product.price} className="text-base">
            € {removeHtmlTags(product.price)}
        </span>
        <span aria-label={"Kleur is: "} className="text-base">
            {product.kleur}
        </span>
      </div>
</article>
  )
}
