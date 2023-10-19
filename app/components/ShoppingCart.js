'use client'
import { useShoppingCart } from 'use-shopping-cart'
import CartItem from './CartItem'
import CheckoutButton from './CheckoutButton'
import Link from 'next/link'

export default function ShoppingCart() {
  const { totalPrice, cartCount, cartDetails } = useShoppingCart()
  return (
    <>
    <section
      className={`z-30 bg-white text-black flex flex-col w-80 py-4 px-4 shadow-lg rounded-md text-left space-y-3`}
    >
          <table className="table-auto text-base">
      <tr>
        <th className='pb-3'>Product</th>
        <th className='pb-3'>Prijs</th>
        <th className='pb-3'>Hoeveelheid</th>
      </tr>
    
      {cartCount && cartCount > 0 ? (
        <>
          {Object.values(cartDetails ?? {}).map((entry) => (
            <CartItem key={entry.id} item={entry} />
          ))}
        </>
      ) : (
        <span>Je winkelmand is leeg</span>
      )}
      </table>
      <span>Totaalprijs: €{totalPrice / 100},-</span>
    </section>
    </>
  )
}
