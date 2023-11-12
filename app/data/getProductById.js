export default async function getProductsById(id){
    const res = await fetch(
      'https://dev.webchange.nl/graphql',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query:
          `
          query ProductById {
            product(id: "${id}", idType: ID) {
              id
              slug
              ... on SimpleProduct {
                id
              }
            }
          }`
          })
    });
    const { data } = await res.json()
    const getProductsById = data

    return getProductsById.product.slug
  }
