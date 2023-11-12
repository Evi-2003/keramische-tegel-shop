'use client'
import Link from 'next/link'
import { useShoppingCart } from 'use-shopping-cart';
import Image from 'next/image';
import CheckMarkGreen from './/components/CheckMark';
import logo from '../public/logo.png';
import optionsUrl from './/components/serverActionUrl'
import { usePathname, useSearchParams } from 'next/navigation'
export default function Header(){
    const searchParams = useSearchParams()
    const zoekTerm = searchParams.get('zoeken')
    const params = new URLSearchParams(searchParams)
    function search(opdracht){
        const zoekOpdracht = opdracht.get('zoeken')
        if(zoekOpdracht != undefined ){
            console.log('stuur')
            optionsUrl('https://headless-wp-react-webshop.vercel.app/shop', '', 'zoeken', zoekOpdracht)
        }
    }
    return(
        <>
            <header className="bg-[--wit] text-[--menu-tekst] h-fit w-full flex flex-col justify-center items-center">
                <section className='bg-slate-100 w-full flex justify-center font-medium text-sm'>
                    <nav className='lg:w-4/5 2xl:w-3/5 py-2 text-slate-950 flex justify-between'>
                        <ul className='flex space-x-10'>
                            <li className='flex'><CheckMarkGreen /> Grote showtuin</li>
                            <li className='flex'><CheckMarkGreen /> Complete tuininrichting</li>
                            <li className='flex'><CheckMarkGreen /> Verkoop, aanleg en montage</li>
                            <li className='flex'><CheckMarkGreen /> Direct contact: 0317 765 005</li>
                        </ul>
                        <span>Bekijk onze reviews</span>
                    </nav>
                </section>
                <nav className='lg:w-4/5 2xl:w-3/5 grid grid-cols-3 space-between items-center'>
                    <Link href="/" aria-label='Ga terug naar Home' className='col-start-1'><Image src={logo} width={350} height={100} alt='Logo van Keramische Tegel Shop' priority></Image></Link>
                    <form action={search} className='col-start-2 col-span-full w-2/3 flex flex-col relative'>
                        <label htmlFor="zoeken">Waar ben je naar opzoek?</label>
                        <input id="zoekVeld" name="zoeken" type="text" placeholder="Bijvoorbeeld: Cera3line Lux & Dutch" className='shadow-md bg-slate-100 rounded-lg py-3 px-5 hover:shadow-lg' defaultValue={zoekTerm ? zoekTerm : undefined}/>
                        <button aria-label='Zoeken' className='hover:shadow-xl hover:scale-95 bg-[--primary] text-white w-fit py-3 px-10 rounded-lg absolute right-0 bottom-0 font-semibold'>Zoeken</button>
                    </form>
                </nav>
                <section className='flex bg-slate-100 text-sky-950 w-full items-center text-center justify-center'>
                    <nav className="lg:w-4/5 2xl:w-3/5 grid grid-cols-2 lg:grid-cols-3 justify-center items-center justify-items-center py-1  px-10">
                        <ul className="col-start-2 row-start-2 lg:row-start-1 flex space-x-5 items-center justify-center font-medium text-lg">
                            <li><Link href="/" className='hover:underline'>Home</Link></li>
                            <li><Link href="/shop" className='hover:underline'>Keramische Tegels</Link></li>
                            <li><Link href="/contact" className='hover:underline'>Contact</Link></li>
                        </ul>
                        <Link href="/winkelmand" aria-label="Ga naar je winkelmand" className='flex items-center row-start-1 col-start-3 bg-[--primary] text-slate-100 w-fit justify-self-center px-5 py-2 rounded-lg shadow-xl hover:scale-95 text-base font-medium'><svg className="fill-slate-100 mr-2" height="24" viewBox="0 0 16 16" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 1V3H2.15287L2.98347 7.98361L2.01942 12.8039C2.00612 12.8704 1.99972 12.9375 2 13.0041C2.00141 13.3451 2 13.6507 2 14C2 15.1046 2.89543 16 4 16C5.10457 16 6 15.1046 6 14H10C10 15.1046 10.8954 16 12 16C13.1046 16 14 15.1046 14 14C14 12.8954 13.1046 12 12 12H4.2198L4.6198 10H15V1H0Z"/></svg>Winkelmand</Link>
                    </nav>
                </section>
            </header>
        </>
    )
}