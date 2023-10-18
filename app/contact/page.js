'use client'
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart'
export default function contact(){
    const { addItem, cartDetails } = useShoppingCart()
    return(
        <main>
            <h1>Contact</h1>
        </main>
    )
}