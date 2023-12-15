import getProductBySlug from "../data/getProductBySlug";
import Product from "./SingleProduct";
import { PageWrapper } from "./pageWrapper.tsx";

export default async function GetProductAndLoad({ slug, searchParams }) {
    let product = await getProductBySlug(slug)
    return (
      <>
        <PageWrapper className="w-4/5 lg:w-9/12 2xl:w-4/6 my-5 mx-5">
            <Product product={product} slug={slug}/>
        </PageWrapper>
      </>
    );
  }