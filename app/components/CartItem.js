'use client'
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'
import Image from 'next/image'
import getProductsById from '../data/getProductById'
import Link from 'next/link'
export default function CartItem({ item }) {
  const { name, quantity, price, attributes } = item
  const { removeItem } = useShoppingCart()
  let totalePrijs
  const removeItemFromCart = () => {
    removeItem(item.id)
  }
 
  const minimaleBestelPrijs = '5'

  if(minimaleBestelPrijs == null) {
    console.log('slay')
    totalePrijs = price
  } else {
    totalePrijs = price * minimaleBestelPrijs;
  }

  return (
      <tr className='border-y-[1px]'>
        <td className='w-fit'>  {name !== 'Verzendkosten' && ( <button className='bg-red-500 text-slate-100 rounded-full w-5 h-5 flex items-center justify-center' onClick={removeItemFromCart} aria-label={"Verwijder " + name + " uit je winkelmand"}
    >
      -
    </button>
  )}</td>

        <td data-label="Product" className='py-3 lg:px-5'>{name}</td> 
        <td data-label="Prijs" className='py-3 lg:px-5'>{formatCurrencyString({ value: parseInt(totalePrijs), currency: 'EUR' })}</td>
        <td data-label="Hoeveelheid" className='py-3  lg:px-5 content-between'>{quantity}</td>
      </tr>
  )
}
