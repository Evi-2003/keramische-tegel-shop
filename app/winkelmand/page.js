'use client'
import ShoppingCart from '../components/ShoppingCart'
import makeOrder from '../checkout/makeOrder.js'
import { useShoppingCart } from 'use-shopping-cart';
import { PageWrapper } from "../components/pageWrapper.tsx";

export default function Winkelmand() {
  const { addItem, totalPrice, cartCount, cartDetails, setItemQuantity } = useShoppingCart();
  const maakDeOrder = makeOrder.bind(cartDetails, cartDetails)

  return (
    <PageWrapper className="w-4/5 lg:w-2/3 text-3xl text-slate-900 font-bold dark:text-slate-100 m-5 text-center flex space-x-10">
      <section className='w-1/2'>
        <ShoppingCart/>
      </section>
      <section className='border rounded-lg w-1/2 flex flex-col shadow-xl py-5'>
        <h2 className='mb-3 font-medium'>Afrekenen</h2>
        <form action={maakDeOrder} className='text-base font-light space-y-1 flex flex-col w-2/3 self-center text-left'>
          <label className="font-medium" htmlFor="voornaam">Voornaam</label>
          <input required type="text" name="voornaam" placeholder="Jan" className=" block w-full px-3 py-2 bg-white border border-slate-300 dark:text-slate-950 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-red-500 invalid:text-red-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "/>
          <label className="font-medium" htmlFor="achternaam">Achternaam</label>
          <input required type="text" name="achternaam" placeholder="Jansen" className=" block w-full px-3 py-2 bg-white border border-slate-300 dark:text-slate-950 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-red-500 invalid:text-red-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "/>
          <label className="font-medium" htmlFor="mail">E-mail</label>
          <input required type="email" name="mail" placeholder="jan.jansen@example.com" className=" block w-full px-3 py-2 bg-white border border-slate-300 dark:text-slate-950 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-red-500 invalid:text-red-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "/>
              <label className="font-medium" htmlFor="adres">Straat & Huisnummer</label>
          <input required type="text" name="adres" placeholder="Damrak 1" className=" block w-full px-3 py-2 bg-white border border-slate-300 dark:text-slate-950 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-red-500 invalid:text-red-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "/>
                  <label className="font-medium" htmlFor="postcode">Postcode</label>
          <input required type="text" name="postcode" placeholder="1012 LG" className=" block w-full px-3 py-2 bg-white border border-slate-300 dark:text-slate-950 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-red-500 invalid:text-red-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "/>
                      <label className="font-medium" htmlFor="plaats">Plaats</label>
          <input required type="text" name="plaats" placeholder="Amsterdam" className=" block w-full px-3 py-2 bg-white border border-slate-300 dark:text-slate-950 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-red-500 invalid:text-red-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "/>
                          <label className="font-medium" htmlFor="nummer">Telefoonnummer</label>
          <input required type="tel" name="nummer" placeholder="06-12345678" className=" block w-full px-3 py-2 bg-white border border-slate-300 dark:text-slate-950 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-red-500 invalid:text-red-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "/>

    <button type="submit" value="Plaats bestelling" className='bg-[--primary] py-1 rounded-lg font-medium w-fit px-5 text-slate-100 hover:scale-95 hover:shadow-sm'>Plaats bestelling</button>
    <span className='py-2'>Bij de volgende stap kies je betaalmethode</span>
        </form>
      </section>
    </PageWrapper>
  )
}
