'use client'
import Image from 'next/image'
import { useEffect } from 'react'
import { Inter } from 'next/font/google'
import { getProducts } from '@/lib/api.js'
import CartItem from '../components/CartItem'
import { useShoppingCart } from 'use-shopping-cart';
import ShoppingCart from '../components/ShoppingCart'

const inter = Inter({ subsets: ['latin'] })

export default function Winkelmand() {
  return (
    <main
      className="w-4/5 lg:w-1/3 text-3xl text-slate-900 font-bold dark:text-slate-100 m-5 text-center"
    >
      <h1 className='mb-3'>Winkelmand</h1>
      <ShoppingCart/>
    </main>
  )
}
