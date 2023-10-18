'use client'
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'
import Image from 'next/image'

export default function CartItem({ item }) {
  const { name, emoji, quantity, price } = item
  const { removeItem } = useShoppingCart()

  const removeItemFromCart = () => {
    removeItem(item.id)
  }

  return (
    <div className="flex items-center gap-4 mb-3">
      <p className="text-4xl">{emoji}</p>
      <div>
        {name} <span className="text-xs">({quantity})</span>
      </div>
      <div className="ml-auto">
        {formatCurrencyString({ value: price, currency: 'GBP' })}
      </div>
      <button
        onClick={() => removeItemFromCart()}
        className="hover:bg-emerald-50 transition-colors rounded-full duration-500 p-1"
      >
        <Image alt="delete icon" src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 6h18M9 6v12M15 6v12M3 6l1 12h16l1-12H3z' /%3E%3C/svg%3E" width={20} height={20} />
      </button>
    </div>
  )
}
