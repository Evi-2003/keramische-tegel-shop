export default async function getProductsBySlug(slug){
    const res = await fetch(
      'https://dev.webchange.nl/graphql',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query:
          `
          query ProductBySlug {
            product(id: "${slug}", idType: SLUG) {
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
          }`
          })
    });
    const { data } = await res.json()
    const getProductsBySlug = data
    return getProductsBySlug
  }