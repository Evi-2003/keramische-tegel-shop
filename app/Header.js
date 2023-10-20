'use client'
import Link from 'next/link'
import { useShoppingCart } from 'use-shopping-cart';
export default function Header(){
    const { cartCount } = useShoppingCart();
    return(
        <>
            <header className="bg-sky-400 dark:bg-sky-700 h-fit w-full flex flex-col lg:flex-row text-white justify-center items-center py-5 px-10">
                <nav className="w-2/3 grid grid-cols-3 justify-center items-center">
                    <a href="/" className="col-start-2 row-start-1 lg:col-start-1 text-2xl text-center">KoelBlauw</a>
                    <ul className="col-start-2 row-start-2 lg:row-start-1 lg:col-start-2 flex space-x-5 items-center justify-center">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/shop">Shop</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>
                    <Link href="/winkelmand" aria-label="Ga naar je winkelmand" className='col-start-2 lg:row-start-1 row-start-3 lg:col-start-3 bg-sky-100 text-black dark:text-slate-100 dark:bg-sky-600 w-fit justify-self-center px-5 py-2 rounded-lg shadow-xl hover:scale-95'>Winkelmand: {cartCount}</Link>
                </nav>
            </header>
        </>
    )
}