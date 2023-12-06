import Image from "next/image";

export default function RelatedProducts(product) {
  const relatedProducts = product.product.related.nodes;
  console.log('related')
  console.log(relatedProducts);
  return (
    <>
      <ul className="space-x-5 hover:cursor-pointer w-full">
        {relatedProducts.map((element) => (
          <li
            key={element.id}
            className="inline-block w-full lg:w-1/4 xl:w-1/5 m-auto mb-3 pb-3 transform transition hover:scale-105"
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
            <section className="border-t-0 border-2 border-solid border-primary rounded-lg px-3 py-3 flex flex-col">
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
