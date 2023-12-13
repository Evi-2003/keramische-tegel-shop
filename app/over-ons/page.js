import { PageWrapper } from "../components/pageWrapper.tsx";
import InspiratieCarousel from "../components/InspiratieCarousel.js";
import Link from 'next/link';
import Image from 'next/image';
import NudetuinLogo from '../../public/merken/nudetuin.svg';
import showroom from "../../public/Showroom.jpeg";
export async function generateMetadata() {
  return {
    title: "Over ons - Keramischetegelshop.nl",
  };
}
export default function overOns() {
  return (
    <PageWrapper className="text-slate-900 dark:text-slate-100 lg:w-8/12 2xl:w-3/6 text-center flex flex-col md:grid md:grid-cols-4 justify-center my-10 mx-5">
      <section className="text-left col-start-1 col-span-4 row-start-1 w-fit md:grid grid-cols-3">
            <h1 className="text-xl font-bold col-start-1 col-span-2 row-start-1">Over ons</h1>
            <h2 className="text-4xl font-medium col-start-1 col-span-2 row-start-2">
                Uw expert in keramische tegels
            </h2>
            <p className="my-2 col-start-1 col-span-2 row-start-3">Keramische Tegel Shop is onderdeel van <Link href="https://nudetuin.nl" target="_blank" aria-label="Nudetuin Sierbestrating & Kunstgras" className="hover:underline text-[--primary] font-semibold">Nudetuin Sierbestrating & Kunstgras</Link>. <br aria-hidden="true"></br>We zijn een bedrijf met veel ervaring in de tegels, we leggen ze ook aan als dat gewenst is. <br aria-hidden="true"></br><br aria-hidden="true"></br>Van verkoop tot en advies, tot het aanleggen en de onderhoud van je tegels. We helpen je het gehele proces. <br aria-hidden="true"></br> Alles onder 1 dak, ook zijn we voor persoonlijk contact en zijn we goed bereikbaar per telefoon, whatsapp, en e-mail.</p>
            <figure className="flex flex-col col-start-3 row-start-1 row-span-3 place-self-center items-center justify-center">
            <Image
              src={NudetuinLogo}
              alt={"Nudetuin"}
              width={300}
              quality="50"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
              loading="lazy"
              height={300}
              className="bg-[#70277B] py-4 px-5 place-self-start md:place-self-center md:justify-center"
            />
            <Image
              src={showroom}
              alt={"Nudetuin"}
              width={300}
              quality="50"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
              loading="lazy"
              height={300}
              className="place-self-start md:place-self-center md:justify-center"
            />
            </figure>
       </section>
       <section className="flex flex-col md:grid grid-cols-3  col-start-1 row-start-2 col-span-full gap-x-5 mt-2 items-center gap-y-3">
            <span className="col-start-1 row-start-1 w-full text-left font-semibold text-lg pt-3 md:mt-0">Onze voordelen</span>
            <article className="col-start-1 row-start-2 w-full border-2 px-5 py-2 rounded-xl">
                <h3 className="text-lg font-medium">Snelle levering</h3>
            </article>

            <article className="col-start-2 row-start-2 w-full border-2 px-5 py-2 rounded-xl">
                <h3 className="text-lg font-medium">Persoonlijk contact</h3>
            </article>

            <article className="col-start-3 row-start-2 w-full border-2 px-5 py-2 rounded-xl">
                <h3 className="text-lg font-medium">Grote showroom</h3>
            </article>

            <article className="col-start-1 row-start-3 w-full border-2 px-5 py-2 rounded-xl">
                <h3 className="text-lg font-medium">Verkoop, aanleg en montage</h3>
            </article>

            <article className="col-start-2 row-start-3 w-full border-2 px-5 py-2 rounded-xl">
                <h3 className="text-lg font-medium">Groot assortiment</h3>
            </article>

            <article className="col-start-3 row-start-3 w-full border-2 px-5 py-2 rounded-xl">
                <h3 className="text-lg font-medium">Hoge kwaliteit</h3>
            </article>
        </section>
        <section className="my-3 col-span-full">

            <InspiratieCarousel />
            
        </section>
    </PageWrapper>
  )}
