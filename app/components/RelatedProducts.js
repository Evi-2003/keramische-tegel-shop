import Image from "next/image";

export default function RelatedProducts(product) {
  const relatedProducts = product.product.related.nodes;
  console.log('related')
  console.log(relatedProducts);
  return (
    <>
      <ul className="space-x-5 hover:cursor-pointer overflow-x-auto flex flex-row overflow-auto">
        {relatedProducts.map((element) => (
    <li
    key={element.id}
    className="flex-shrink-0 inline-block w-1/2 md:w-3/6 xl:w-3/12 2xl:w-1/6 h-full mb-3 pb-3 transform transition hover:scale-95"
  >
            <a
              href={"/producten/" + element.slug}
              aria-label={"Ga naar het product " + element.name}
              className="relative"
            >
              <Image
                src={element.image.sourceUrl}
                alt={"Afbeelding van de " + element.name}
                width={320}
                priority="low"
                height={320}
                className="w-full"
              />
              <span className="product-price absolute bg-white text-black font-semibold items-center px-2 py-1 rounded-lg bottom-0 right-0 m-4 text-xs">
                € {element.price},-
              </span>
              <span className="product-price absolute bg-white text-black font-semibold items-center px-2 py-1 rounded-lg top-0 left-0 m-[1.25em!important] text-xs">
                {element.attributes.nodes.find(node => node.name == 'pa_afmetingen').options[0].replace(/-x-/g, ' x ')}
              </span>
            </a>
            <section className="border-t-0 border-b-2 border-l-2 border-r-2 border-solid border-primary h-full rounded-b-lg px-3 py-3 flex flex-col dark:text-slate-100">
              <h3 className="break-words mb-1">
                <a
                  href={"/producten/" + element.slug}
                  aria-label={"Ga naar het product " + element.name}
                  className="break-words"
                >
                  {element.name}
                </a>
              </h3>
            </section>
          </li>
        ))}
      </ul>
    </>
  );
}
