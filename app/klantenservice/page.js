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
              class="fill-black dark:fill-white w-8 h-8"
              height="1200pt"
              version="1.1"
              viewBox="0 0 1200 1200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path d="m843.84 663.12-82.199-60c-10.32-7.5586-23.039-10.68-35.762-8.6406-12.719 1.9219-23.879 8.7617-31.32 19.078l-25.441 34.801c-1.3203 1.8008-0.83984 0.12109-1.4414 2.3984-0.12109 0.23828-1.5586 2.1602-6.1211 2.8789-7.6797 1.1992-30.719-0.23828-80.52-40.078l-4.8008-3.4805c-52.441-34.922-60.84-56.398-62.039-64.078-0.60156-3.9609 0.35938-5.8789 0.23828-6 1.6797-1.0781 1.1992-1.0781 2.5195-2.7617l25.441-34.801c7.5586-10.32 10.68-23.039 8.6406-35.762-2.0391-12.719-8.7617-23.879-19.078-31.441l-83.641-61.078c-21.359-15.602-51.48-10.922-67.078 10.441l-25.68 35.281c-22.68 31.078-28.801 73.559-15.961 111 19.801 57.719 70.32 119.04 150.24 182.4 1.0781 1.3203 2.2812 2.3984 3.7188 3.4805 2.0391 1.4414 4.0781 2.8789 6.1211 4.1992 1.9219 1.5586 3.9609 3 5.8789 4.5586 1.3203 1.0781 2.8789 1.9219 4.4414 2.5195 84.719 56.762 158.52 86.16 219.6 87.48h2.3984c37.922 0 74.039-18.602 96.961-50.16l25.68-35.281c7.5586-10.32 10.68-23.039 8.6406-35.762-2.0391-12.711-9.1172-23.633-19.438-31.191zm-18.602 45.84-25.68 35.281c-16.559 22.68-42.602 35.762-69.602 35.281-38.762-0.83984-106.32-16.801-209.4-87.602-98.762-76.559-134.64-136.08-147.24-172.68-9.1211-26.398-4.9219-56.398 11.039-78.121l25.801-35.281c1.9219-2.6406 4.6797-4.3203 7.8008-4.8008 3.1211-0.48047 6.3594 0.23828 9 2.1602l83.641 61.078c2.6406 1.9219 4.3203 4.6797 4.8008 7.8008 0.48047 3.1211-0.23828 6.3594-2.1602 9l-24.602 33.719c-5.7617 6.2383-11.52 17.641-10.559 32.039 1.9219 28.922 27.48 59.281 77.641 92.641l3.6016 2.5195c47.52 38.039 84.359 53.16 112.44 46.078 14.039-3.4805 23.16-12.359 27.359-19.801l24.602-33.719c3.8398-5.3984 11.398-6.4805 16.801-2.6406l82.199 60c2.6406 1.9219 4.3203 4.6797 4.8008 7.8008 0.35156 3.4844-0.36719 6.7266-2.2891 9.2461z" />
                <path d="m600 171.72c-230.04 0-417.24 187.2-417.24 417.24 0 98.641 34.801 193.68 98.281 268.8l-74.039 144.36c-3.2383 6.3594-2.3984 14.16 2.1602 19.68 3.4805 4.1992 8.6406 6.4805 13.801 6.4805 1.6797 0 3.4805-0.23828 5.1602-0.71875l198.6-59.039c54.602 24.961 112.8 37.559 173.28 37.559 230.04 0 417.24-187.2 417.24-417.24-0.007813-230.04-187.21-417.12-417.25-417.12zm0 798.36c-57.359 0-112.56-12.48-164.16-37.078-4.0781-1.9219-8.6406-2.2812-12.84-0.96094l-164.76 48.961 60.359-117.72c3.3594-6.6016 2.3984-14.641-2.6406-20.281-62.641-69.961-97.199-160.32-97.199-254.16 0-210.24 171-381.24 381.24-381.24 210.24 0 381.24 171 381.24 381.24 0.003906 210.24-171 381.24-381.23 381.24z" />
              </g>
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
            Alle foto&apos;s zijn gemaakt van de tegels zelf. Het kan zo zijn
            dat door de belichting of de instellingen van uw beeldscherm de
            kleur iets afwijkt. Als je altijd langskomen bij onze showroom.
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
          <h2 className="text-2xl font-medium">Showroom</h2>
          <p>
            Kom langs bij onze showroom in Wageningen! vindt hier een enorme
            presentatie aan sierbestrating, tuintegels, kunstgras en overige
            producten voor uw tuin. Wij zijn onderdeel van{" "}
            <Link
              href="https://nudetuin.nl"
              target="_blank"
              aria-label="Website van Nudetuin"
              className="text-[--primary] hover:underline hover:scale-95"
            >
              Nudetuin
            </Link>
          </p>
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
                <br aria-hidden="true"></br>Nudepark 93
                <br aria-hidden="true"></br> 6702 DZ Wageningen
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
