'use client'
import { useShoppingCart } from 'use-shopping-cart'
import CartItem from './CartItem'
import CheckoutButton from './CheckoutButton'

export default function ShoppingCart() {
  const { totalPrice, cartCount, cartDetails } = useShoppingCart()
  return (
    <>
    <div
      className={`z-30 bg-white text-black flex flex-col right-3 md:right-9 top-14 w-80 py-4 px-4 shadow-[0_5px_15px_0_rgba(0,0,0,.15)] rounded-md transition-opacity duration-500 justify-center text-center items-center space-y-3`}
    >
      {cartCount && cartCount > 0 ? (
        <>
          {Object.values(cartDetails ?? {}).map((entry) => (
            <CartItem key={entry.id} item={entry} />
          ))}
          <CheckoutButton />
        </>
      ) : (
        <div className="p-5">You have no items in your cart</div>
      )}
      <span className='w-fit text-center bg-black text-white px-5 py-1 rounded-lg'>€{totalPrice / 100},-</span>
    </div>
    </>
  )
}
