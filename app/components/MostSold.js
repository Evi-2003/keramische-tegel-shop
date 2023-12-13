import Image from "next/image";
import Product from "./Product";
export default function MostSold({product}) {
  return (
    <>
      <Product product={product}></Product>
    </>
  );
}
