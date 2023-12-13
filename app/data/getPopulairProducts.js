'use server'
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
            products(where: {orderby: {field: TOTAL_SALES, order: DESC}}, first: 1) {
              nodes {
                id
                name
                slug
                description
                shortDescription
                image {
                  altText
                  sourceUrl
                }
                ... on SimpleProduct {
                  id
                  name
                  price
                  attributes {
                    nodes {
                      name
                      label
                      options
                    }
                  }
                  databaseId
                }
              }
            }
          }
          `
        })
  });
  const { data } = await res.json()

  const products = data.products.nodes[0]
  return products
}