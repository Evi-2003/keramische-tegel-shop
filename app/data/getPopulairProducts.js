  export default async function getPopulairProducts(){
    const res = await fetch(
      'https://betalen.keramischetegelshop.nl/graphql',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query:
          `
          query getPopulairProducts {
            products(where: {orderby: {field: TOTAL_SALES, order: DESC}}) {
              nodes {
                name
                image {
                  sourceUrl
                }
              }
            }
          }
          `
        })
  });
  const { data } = await res.json()

  const products = data.products.nodes

  return products
}