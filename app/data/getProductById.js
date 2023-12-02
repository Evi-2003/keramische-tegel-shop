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
            product(id: "${id}") {
              id
    name
    slug
    description
    shortDescription
    attributes {
      edges {
        node {
          id
          name
          options
        }
      }
    }
    image {
      altText
      sourceUrl
    }
    ... on VariableProduct {
      onSale
      price
      content
      regularPrice
      allPaAfmetingen {
        nodes {
          name
          variations {
            edges {
              node {
                id
                name
                price
                image {
                  id
                  sourceUrl
                }
              }
            }
          }
        }
      }
    }
    related {
      edges {
        node {
          id
          name
          slug
          image {
            altText
            sourceUrl
          }
        }
      }
    }
    allPaAfmetingen {
      nodes {
        databaseId
        id
        name
      }
    }
    allPaKleur {
      nodes {
        name
        slug
        variations {
          nodes {
            databaseId
            id
            name
          }
        }
      }
    }
    allPaKleurNaam {
      nodes {
        id
        name
        variations {
          nodes {
            id
            name
            featuredImage {
              node {
                id
                sourceUrl
              }
            }
          }
        }
      }
    }
    allPaMinimaleHoeveelheidM2 {
      nodes {
        id
        name
        databaseId
        variations {
          nodes {
            id
            name
          }
        }
      }
    }
    allPaMinimumAantal {
      nodes {
        id
        databaseId
        name
        variations {
          nodes {
            id
            name
          }
        }
      }
    }
  }
}
          `
          })
    });
    const { data } = await res.json()

    const getProductsById = data.product
 
    return getProductsById
  }
