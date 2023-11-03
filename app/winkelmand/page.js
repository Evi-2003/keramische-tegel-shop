'use client'
import ShoppingCart from '../components/ShoppingCart'
import makeOrder from '../checkout/makeOrder.js'
import { useShoppingCart } from 'use-shopping-cart';

export default function Winkelmand() {
  const { addItem, totalPrice, cartCount, cartDetails, setItemQuantity } = useShoppingCart();
  const maakDeOrder = makeOrder.bind(null, cartDetails)

  return (
    <main className="w-4/5 lg:w-2/3 text-3xl text-slate-900 font-bold dark:text-slate-100 m-5 text-center flex space-x-10">
      <section className='w-1/2 py-5'>
        <h1 className='mb-3'>Winkelmand</h1>
        <ShoppingCart/>
      </section>
      <section className='w-1/2 flex flex-col shadow-xl py-5'>
        <h2 className='mb-3'>Afrekenen</h2>
        <form action={maakDeOrder} className='text-base font-medium space-y-1 flex flex-col w-2/3 self-center text-left space-y-2'>
          <label htmlFor="voornaam">Voornaam</label>
          <input type="text" name="voornaam" placeholder="Henk" className=" block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-red-500 invalid:text-red-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "/>
          <label htmlFor="achternaam">Achternaam</label>
          <input type="text" name="achternaam" placeholder="van Dijk" className=" block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-red-500 invalid:text-red-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "/>
          <label htmlFor="mail">E-mail</label>
          <input type="email" name="mail" placeholder="e-mail@mail.com" className=" block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-red-500 invalid:text-red-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "/>
              <label htmlFor="adres">Straat & Huisnummer</label>
          <input type="text" name="adres" placeholder="Straat 123" className=" block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-red-500 invalid:text-red-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "/>
                  <label htmlFor="postcode">Postcode</label>
          <input type="text" name="postcode" placeholder="1234AB" className=" block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-red-500 invalid:text-red-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "/>
                      <label htmlFor="plaats">Plaats</label>
          <input type="text" name="plaats" placeholder="Veenendaal" className=" block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-red-500 invalid:text-red-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "/>
                          <label htmlFor="nummer">Telefoonnummer</label>
          <input type="tel" name="nummer" placeholder="06-12345678" className=" block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-red-500 invalid:text-red-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "/>

    <button type="submit" value="Plaats bestelling" accessKey='s'>Plaats bestelling</button>
        </form>
      </section>
    </main>
  )
}
