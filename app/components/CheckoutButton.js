
import { useState } from 'react'
import { useShoppingCart } from 'use-shopping-cart'


export default function CheckoutButton() {

  const [status, setStatus] = useState('idle')
  const { redirectToCheckout, cartCount, totalPrice, cartDetails } =
    useShoppingCart()

  async function handleClick(event) {
    event.preventDefault()
    if (cartCount > 0) {
      setStatus('Effe denken')

      try {
        const res = await fetch('/session', {
          method: 'POST',
          body: JSON.stringify(cartDetails)
        })

        const data = await res.json()
        const result = await redirectToCheckout(data.sessionId)

        if (result?.error) {
          console.error(result.error) // Log the error message
          setStatus('redirect-error')
        }
      } catch (error) {
        console.error(error)
        setStatus('redirect-error')
      }
    } else {
      setStatus('no-items')
    }
  }

  return (
    <>
      <span className="text-red-700 text-xs text-center">
        {totalPrice && totalPrice < 30
          ? 'Je moet wel minimaal 30 cent betalen'
          : cartCount && cartCount > 20
          ? 'Je mag niet meer dan 20 items hebben'
          : status === 'redirect-error'
          ? 'Oepsie, er is chaos op de website, probeer het later nog eens'
          : null}
      </span>
      <button
        onClick={handleClick}
        className="mx-5 bg-sky-600 hover:bg-sky-900 text-white dark:bg-sky-600 dark:text-slate-100 dark:hover:bg-sky-950 transition-colors duration-500 py-2 px-5 rounded-md"
        disabled={
          (totalPrice && totalPrice < 30) ||
          (cartCount && cartCount > 20) ||
          status == 'no-items'
            ? true
            : false
        }
      >
        {status !== 'loading' ? 'Afrekenen' : 'Loading...'}
      </button>
    </>
  )
}
