import { PageWrapper } from "../components/pageWrapper.tsx";
import whatsappIcon from "../../public/svg/whatsapp.svg";
import envelop from "../../public/svg/envelop.svg";
import Link from "next/link";
import Image from "next/image";
import showroom from "../../public/Showroom.jpeg";
export async function generateMetadata() {
  return {
    title: "Klantenservice - Keramischetegelshop.nl",
  };
}
export default function contact() {
  return (
    <PageWrapper className="text-slate-900 dark:text-slate-100 lg:w-8/12 2xl:w-3/6 text-center flex flex-col justify-center my-10 mx-5">
      <section className="text-left col-start-2 col-span-2 w-fit">
        <h1 className="text-xl font-bold">Klantenservice</h1>
        <h2 className="text-4xl font-medium">
          Hoe kunnen we je verder helpen?
        </h2>
      </section>
      <section className="grid grid-cols-3 gap-x-5 my-3 items-center">
        <Link
          className="col-start-1 row-start-1 border-2 shadow-sm rounded-xl grid grid-cols-3 relative h-16 transform transition-all hover:border-[--primary] hover:border-[1.5px] hover:scale-95 hover:shadow-lg"
          href="https://wa.link/hdqdjd"
          target="_blank"
          aria-label="Whatsapp van klantenservice"
        >
          <span className="w-16 h-full absolute left-0 top-0 flex text-center items-center justify-center rounded-lg">
            <svg
              width="1200pt"
              height="1200pt"
              class="fill-black dark:fill-white w-8 h-8"
              version="1.1"
              viewBox="0 0 1200 1200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m950 150h-700c-82.727 0-150 67.273-150 150v422.18c0 82.727 67.273 150 150 150h210.3l78.125 140.6c12.602 22.699 35.625 36.25 61.574 36.25s49-13.551 61.602-36.25l78.125-140.6h210.27c82.727 0 150-67.273 150-150v-422.18c0-82.727-67.273-150-150-150zm-650 425c-41.426 0-75-33.574-75-75s33.574-75 75-75 75 33.574 75 75-33.574 75-75 75zm300 0c-41.426 0-75-33.574-75-75s33.574-75 75-75 75 33.574 75 75-33.574 75-75 75zm300 0c-41.426 0-75-33.574-75-75s33.574-75 75-75 75 33.574 75 75-33.574 75-75 75z" />
            </svg>
          </span>

          <span className="col-start-2 row-start-1 items-center text-lg place-self-center md:flex flex-col hidden">
            <h3 className="m-0 p-0 leading-2">Whatsapp</h3>
            <span className="m-0 p-0 text-sm leading-2">0317 765 005</span>
          </span>
          <span className="col-start-3 row-start-1 items-center place-self-center">
            &gt;
          </span>
        </Link>
        <Link
          className="col-start-2 row-start-1 border-2 shadow-sm rounded-xl grid grid-cols-3 relative h-16 transform transition-all hover:border-[--primary] hover:border-[1.5px] hover:scale-95 hover:shadow-lg"
          href="email:info@keramischetegelshop.nl"
          aria-label="Email van klantenservice"
        >
          <span className="w-16 h-full absolute left-0 top-0 flex items-center justify-center rounded-lg">
            <svg
              width="1200pt"
              height="1200pt"
              version="1.1"
              viewBox="0 0 1200 1200"
              class="fill-black dark:fill-white w-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path d="m170.55 312.94 363.93 286.36c16.461 12.926 39.312 17.801 61.301 16.762 22.125 1.0391 44.789-5.1133 61.438-18.211l363.93-284.68c29.035-23.039 22.508-38.176-14.527-38.176h-821.56c-36.988 0-43.562 14.898-14.5 37.938z" />
                <path d="m142.76 385.06c-29.613-22.363-55.262-10.301-55.262 26.699v495.36c0 9.5234 3.6133 18.602 7.2109 26.852l332.76-332.76z" />
                <path d="m1046.9 385.06-277.75 211.02 328.73 329.1c1.6094-5.7734 2.1602-11.824 2.1602-18.074v-495.35c0-37-23.574-49.062-53.137-26.699z" />
                <path d="m649.57 687c-14.875 11.148-34.363 16.637-53.637 16.461-19.5 0.17578-38.988-5.3008-53.863-16.461l-67.625-51.336-336 336.21c6.1758 1.8984 12.727 3.125 19.488 3.125h875.77c10.012 0 19.488-2.4766 28.051-6.4609l-337.8-337.9z" />
              </g>
            </svg>
          </span>
          <span
            className="col-start-2 row-start-1 items-center text-lg place-self-center md:flex flex-col hidden"
            href="email:info@keramischetegelshop.nl"
            aria-label="Email van klantenservice"
          >
            <h3 className="m-0 p-0 leading-2">Email</h3>
          </span>
          <span className="col-start-3 row-start-1 items-center place-self-center">
            &gt;
          </span>
        </Link>
        <Link
          className="col-start-3 row-start-1 border-2 shadow-sm rounded-xl grid grid-cols-3 relative h-16 transform transition-all hover:border-[--primary] hover:border-[1.5px] hover:scale-95 hover:shadow-lg"
          href="tel:0317 765 005"
          aria-label="Nummer van klantenservice"
        >
          <span className="w-16 h-full absolute left-0 top-0 flex items-center justify-center rounded-lg">
            <svg
              width="1200pt"
              height="1200pt"
              class="fill-black dark:fill-white w-8 h-8"
              version="1.1"
              viewBox="0 0 1200 1200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path d="m794.4 825.6 322.8 142.8s2.3984-50.398 3.6016-68.398c0-18-2.3984-30-16.801-40.801-14.398-10.801-182.4-79.199-201.6-88.801-19.199-9.6016-49.199 1.1992-56.398 7.1992-6 6-51.602 48-51.602 48z" />
                <path d="m394.8 391.2-93.602-324s91.199-16.801 105.6 31.199c0 0 44.398 159.6 56.398 206.4 14.402 57.602-68.398 86.402-68.398 86.402z" />
                <path d="m778.8 855.6 312 136.8s-94.801 106.8-201.6 134.4c-241.2 62.398-535.2-235.2-596.4-315.6-61.199-79.199-321.6-492-165.6-646.8 60-60 145.2-86.398 145.2-86.398l94.801 324s-80.398 70.801-8.3984 159.6c72 90 198 231.6 276 300 79.199 68.398 144-6 144-6z" />
              </g>
            </svg>
          </span>
          <span
            className="col-start-2 row-start-1 items-center text-lg place-self-center hidden md:flex flex-col"
            href="tel:0317 765 005"
            aria-label="Email van klantenservice"
          >
            <h3 className="m-0 p-0 leading-2">Bellen</h3>
            <span className="m-0 p-0 text-sm leading-2">0317 765 005</span>
          </span>
          <span className="col-start-3 row-start-1 h-full flex items-center justify-center">
            &gt;
          </span>
        </Link>
      </section>
      <h2 className="text-2xl font-medium text-left mt-3">
        Veelgestelde vragen
      </h2>
      <section className="gap-x-5 gap-y-2 grid grid-col-1 md:grid-cols-2">
        <details className="border-2 p-5 h-fit rounded-lg mt-2 w-full transform transition-all text-center open:bg-[--primary] open:text-white open:shadow-2xl hover:shadow-lg">
          <summary className="w-full text-lg text-left md:text-left hover:cursor-pointer">
            Hoeveel zijn de verzendkosten?
          </summary>
          <p className="text-left mx-5 text-base">
            Per bestellen wordt er € 90,- verzendkosten gerekend. Voor een
            snelle afhandeling van orders worden onze producten direct door de
            fabrikant bij u geleverd.
          </p>
        </details>
        <details className="border-2 p-5 h-fit rounded-lg mt-2 w-full transform transition-all text-center open:bg-[--primary] open:text-white open:shadow-2xl hover:shadow-lg">
          <summary className="w-full text-lg text-left md:text-left hover:cursor-pointer">
            Hebben jullie een showroom?
          </summary>
          <p className="text-left mx-5 text-base">
            Jazeker! Tijdens de openingstijden hieronder bent u welkom op
            Nudepark 93, 6702 DZ Wageningen.
          </p>
        </details>
        <details className="border-2 p-5 h-fit rounded-lg mt-2 w-full transform transition-all text-center open:bg-[--primary] open:text-white open:shadow-2xl hover:shadow-lg">
          <summary className="w-full text-lg text-left md:text-left hover:cursor-pointer">
            Is er een kleurverschil met het geleverde product?
          </summary>
          <p className="text-left mx-5 text-base">
            Alle foto&apos;s zijn gemaakt van de tegels zelf. Het kan zo zijn dat
            door de belichting of de instellingen van uw beeldscherm de kleur
            iets afwijkt. Als je altijd langskomen bij onze showroom.
          </p>
        </details>
        <details className="border-2 p-5 h-fit rounded-lg mt-2 w-full transform transition-all text-center open:bg-[--primary] open:text-white open:shadow-2xl hover:shadow-lg">
          <summary className="w-full text-lg text-left md:text-left hover:cursor-pointer">
            Worden de tegels ook aangelegd?
          </summary>
          <p className="text-left mx-5 text-base">
            Als je tuintegels bij ons koopt, heb je de optie om deze zelf in je
            tuin te leggen, wat natuurlijk kostenbesparend werkt. Maar als je
            liever hebt dat iemand anders de installatie doet, kunnen we een
            complete service van A tot Z voor je regelen.
          </p>
        </details>
        <details className="border-2 p-5 h-fit rounded-lg mt-2 w-full transform transition-all text-center open:bg-[--primary] open:text-white open:shadow-2xl hover:shadow-lg">
          <summary className="w-full text-lg text-left md:text-left hover:cursor-pointer">
            Hoelang gaan tegels mee?
          </summary>
          <p className="text-left mx-5 text-base">
            Keramische tegels die in de tuin worden gebruikt, staan bekend om
            hun duurzaamheid. Goed onderhouden en kwalitatieve tegels kunnen
            tientallen jaren meegaan. Echter, dit hangt ook sterk af van
            weersomstandigheden en het gebruik ervan. Regelmatig onderhoud en
            een goede installatie spelen een cruciale rol in de levensduur van
            de tegels. Over het algemeen geldt: hoe beter de zorg, hoe langer de
            tegels meegaan.
          </p>
        </details>
        <details className="border-2 p-5 h-fit rounded-lg mt-2 w-full transform transition-all text-center open:bg-[--primary] open:text-white open:shadow-2xl hover:shadow-lg">
          <summary className="w-full text-lg text-left md:text-left hover:cursor-pointer">
            Zit er garantie op de tegels?
          </summary>
          <p className="text-left mx-5 text-base">
            Op elk product dat u bij ons koopt, is een fabrieksgarantie van
            toepassing. De exacte garantietermijn varieert afhankelijk van het
            product. We geven je graag meer informatie over de specifieke
            garantie die van toepassing is op jouw aankopen. Het is belangrijk
            om te onthouden dat je factuur dient als garantiebewijs, dus zorg
            ervoor dat je deze veilig opbergt totdat de garantieperiode is
            verlopen.
          </p>
        </details>
      </section>

      <section className="mt-3">
        <h2 className="text-2xl font-medium text-left mt-3">Openingstijden</h2>
        <table class="table w-full text-center rounded-xl border mt-2">
          <thead>
            <tr>
              <th class="w-1/6 px-2 py-1 border">Ma</th>
              <th class="w-1/6 px-2 py-1 border">Di</th>
              <th class="w-1/6 px-2 py-1 border">Wo</th>
              <th class="w-1/6 px-2 py-1 border">Do</th>
              <th class="w-1/6 px-2 py-1 border">Vr</th>
              <th class="w-1/6 px-2 py-1 border">Za</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-sm">
              <td class="border px-2 py-4 my-4">09:00 t/m 17:00</td>
              <td class="border px-2 py-4">09:00 t/m 17:00</td>
              <td class="border px-2 py-4">09:00 t/m 17:00</td>
              <td class="border px-2 py-4">09:00 t/m 14:30</td>
              <td class="border px-2 py-4">09:00 t/m 17:00</td>
              <td class="border px-2 py-4">09:00 t/m 13:00</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="my-3 flex flex-col md:grid grid-cols-2 gap-x-5">
        <Image
          src={showroom}
          alt={"Onze showroom in Wageningen"}
          width={500}
          quality="20"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
          height={300}
          loading="lazy"
          className="object-cover rounded-xl shadow-md col-start-1 place-self-center"
        />
        <article className="text-left my-2 col-start-2 row-start-1 w-full place-self-start">
          <h2 className="text-2xl font-medium">
            Showroom
          </h2>
          <p>Kom langs bij onze showroom in Wageningen! vindt hier een enorme presentatie aan sierbestrating, tuintegels, kunstgras en overige producten voor uw tuin. Wij zijn onderdeel van <Link href="https://nudetuin.nl" target="_blank" aria-label="Website van Nudetuin" className="text-[--primary] hover:underline hover:scale-95">Nudetuin</Link></p>
          <ul className="mt-1 col-start-2 row-start-2">
            <li className="hover:underline hover:scale-95">
              <a
                href="tel:0317765005"
                aria-label="Bellen naar Keramische Tegel Shop"
                className="hover:underline"
              >
                <b>Tel</b>
                <br aria-hidden="true"></br>0317 765 005
              </a>
            </li>
            <li className="hover:underline hover:scale-95">
              <Link
                href="https://maps.app.goo.gl/dfEmEZo1ntC5vVpn8"
                aria-label="Routebeschrijving naar de showroom van Keramische Tegel Shop"
                className="hover:scale-95 hover:underline"
                target="_blank"
              >
                <b>Adres</b>
                <br aria-hidden="true"></br>Nudepark 93, 6702 DZ Wageningen
              </Link>
            </li>
            <li className="hover:underline hover:scale-95">
              <a
                href="email:info@keramischetegelshop.nl"
                aria-label="Stuur een mail"
              >
                <b>Email</b>
                <br aria-hidden="true"></br>info@keramischetegelshop.nl
              </a>
            </li>
          </ul>
        </article>
      </section>
    </PageWrapper>
  );
}
