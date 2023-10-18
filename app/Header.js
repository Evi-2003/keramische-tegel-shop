import Link from 'next/link'
import ShoppingCart from './components/ShoppingCart'
export default function Header(){
    return(
        <>
            <header className="bg-sky-400 dark:bg-sky-700 h-fit w-full flex text-white justify-center items-center py-5 px-10">
                <nav className="w-2/3 grid grid-cols-3 justify-center items-center">
                    <a href="/" className="col-start-1 text-2xl">KoelBlauw</a>
                    <ul className="col-start-2 flex space-x-5 items-center justify-center">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/shop">Shop</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>
                    <ShoppingCart />
                </nav>
            </header>
        </>
    )
}