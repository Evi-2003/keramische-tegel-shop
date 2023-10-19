'use client'
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'
import Image from 'next/image'

export default function CartItem({ item }) {
  const { name, quantity, price } = item
  const { removeItem } = useShoppingCart()

  const removeItemFromCart = () => {
    removeItem(item.id)
  }

  return (
      <tr className='border-y-[1px]'>
        <td data-label="Product" className='py-3'>{name}</td>
        <td data-label="Prijs">{formatCurrencyString({ value: price, currency: 'EUR' })}</td>
        <td data-label="Hoeveelheid" className='s
        content-between'>{quantity}</td>
      </tr>
  )
}
