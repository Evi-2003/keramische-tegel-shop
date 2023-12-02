import Image from "next/image";

export default function RelatedProducts(product) {

  const relatedProducts = product.product.related.edges;

  return (
    <>
      <ul className="overflow-x-scroll w-fit whitespace-nowrap space-x-5 hover:cursor-pointer">
        {relatedProducts.map((element) => (
          <li
            key={element.node.id}
            className="inline-block w-full lg:w-1/4 2xl:w-1/5 m-auto hover:scale-95 bg-[--wit] rounded-lg mb-5"
          >
            <a href={"/producten/" + element.node.slug} aria-label={"Ga naar het product " + element.node.name}>
              <Image
                src={element.node.image.sourceUrl}
                alt={"Afbeelding van de " + element.node.name}
                width={320}
                priority="low"
                height={320}
                className="w-full"
              />
            </a>
            <h4 className="my-3 text-center">
              <a href={"/producten/" + element.node.slug} aria-label={"Ga naar het product " + element.node.name}>
                {element.node.name}
              </a>
            </h4>
          </li>
        ))}
      </ul>
    </>
  );
}
