import GetProductAndLoad from "../../components/GetProductAndLoad"

export default function ProductPage({ params: { slug, searchParams } }) {
  return (
    <>
      <GetProductAndLoad slug={slug} searchParams={searchParams}/>
    </>
  );
}
