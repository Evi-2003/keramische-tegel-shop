'use client'
import Link from 'next/link'
import { useShoppingCart } from 'use-shopping-cart';
import Image from 'next/image';
import CheckMarkGreen from './/components/CheckMark';
export default function Header(){
    const { cartCount } = useShoppingCart();
    return(
        <>
            <header className="bg-[--wit] text-[--menu-tekst] h-fit w-full flex flex-col justify-center items-center">
                <section className='bg-[--primary] w-full flex justify-center font-medium text-sm'>
                    <nav className='w-2/3 lg:w-4/5 py-2 text-slate-100 flex justify-between'>
                        <ul className='flex space-x-10'>
                            <li className='flex'><CheckMarkGreen /> Grote showtuin</li>
                            <li className='flex'><CheckMarkGreen /> Complete tuininrichting</li>
                            <li className='flex'><CheckMarkGreen /> Verkoop, aanleg en montage</li>
                            <li className='flex'><CheckMarkGreen /> Direct contact: 0317 765 005</li>
                        </ul>
                        <span>Bekijk onze reviews</span>
                    </nav>
                </section>
                <nav className="w-2/3 lg:w-11/12 grid grid-cols-4 lg:grid-cols-3 justify-center items-center justify-items-center py-2 px-10">
                    <Link href="/" aria-label='Ga terug naar Home' className='col-start-2 row-start-1 lg:col-start-1'><Image src={"https://dev.webchange.nl/wp-content/uploads/2023/10/SCR-20231031-tigj-2-removebg-preview.png"} width={256} height={60} alt='Logo van Keramische Tegel Shop' priority></Image></Link>
                    <ul className="col-span-full row-start-2 lg:row-start-1 flex space-x-5 items-center justify-center font-medium text-lg">
                        <li><Link href="/" className='hover:underline'>Home</Link></li>
                        <li><Link href="/shop" className='hover:underline'>Keramische Tegels</Link></li>
                        <li><Link href="/contact" className='hover:underline'>Contact</Link></li>
                    </ul>
                    <Link href="/winkelmand" aria-label="Ga naar je winkelmand" className='flex items-center row-start-1 col-start-4 xl:col-start-3 bg-[--primary] text-slate-100 font-semibold w-fit justify-self-center px-5 py-2 rounded-lg shadow-xl hover:scale-95 text-xl'><svg className="fill-slate-100" height="24" viewBox="0 0 16 16" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 1V3H2.15287L2.98347 7.98361L2.01942 12.8039C2.00612 12.8704 1.99972 12.9375 2 13.0041C2.00141 13.3451 2 13.6507 2 14C2 15.1046 2.89543 16 4 16C5.10457 16 6 15.1046 6 14H10C10 15.1046 10.8954 16 12 16C13.1046 16 14 15.1046 14 14C14 12.8954 13.1046 12 12 12H4.2198L4.6198 10H15V1H0Z"/></svg></Link>
                </nav>
            </header>
        </>
    )
}