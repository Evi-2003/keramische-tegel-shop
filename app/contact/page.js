'use client'
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart'
export default function contact(){
    const { addItem, cartDetails } = useShoppingCart()
    return(
        <main
        className="text-slate-900 dark:text-slate-100 m-5 text-center py-5"
      >
        <h1 className='text-3xl font-medium text-left'>Hey, <br/>Kunnen we je helpen?</h1>
      </main>
    )
}