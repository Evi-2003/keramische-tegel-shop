'use client'
import Image from 'next/image'
import { useEffect } from 'react'
import { Inter } from 'next/font/google'
import { getProducts } from '../../lib/api.js'
import CartItem from '../components/CartItem'
import { useShoppingCart } from 'use-shopping-cart';
import ShoppingCart from '../components/ShoppingCart'

const inter = Inter({ subsets: ['latin'] })

export default function Winkelmand() {
  return (
    <main className="w-4/5 lg:w-2/3 text-3xl text-slate-900 font-bold dark:text-slate-100 m-5 text-center flex space-x-10">
      <section className='w-1/2 py-5'>
        <h1 className='mb-3'>Winkelmand</h1>
        <ShoppingCart/>
      </section>
      <section className='w-1/2 flex flex-col shadow-xl py-5'>
        <h2 className='mb-3'>Afrekenen</h2>
        <form action="" className='text-base flex flex-col w-2/3 self-center text-left space-y-1'>
          <label for="voornaam">Voornaam</label>
          <input type="text" name="voornaam" placeholder="Henk" class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-red-500 invalid:text-red-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "/>
          <label for="achternaam">Achternaam</label>
          <input type="text" name="achternaam" placeholder="Slayman" class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-red-500 invalid:text-red-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "/>
          <label for="email">E-mail</label>
          <input type="email" name="email" placeholder="e-mail@mail.com" class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-red-500 invalid:text-red-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "/>
        </form>
      </section>
    </main>
  )
}
