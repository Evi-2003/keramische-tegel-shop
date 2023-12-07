export default async function getProductsBySlug(slug){
    const res = await fetch(
      'https://betalen.keramischetegelshop.nl/graphql',{
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
              variantAttributes {
                name
                value
                productId
                productSlug
              }
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
              related {
                nodes {
                  ... on SimpleProduct {
                    id
                    name
                    slug
                    attributes {
                      nodes {
                        name
                        label
                        options
                      }
                    }
                    image {
                      sourceUrl
                    }
                    price
                  }
                }
              }
            }
          }`
          })
    });
    const { data } = await res.json()

    const getProductsBySlug = data
    console.log('PRODUCT')
    console.log(data)
    return getProductsBySlug
  }