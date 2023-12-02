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
            product(id: "794", idType: SLUG) {
              edges {
                node {
                  id
                  slug
                  name
                  type
                  databaseId
                  shortDescription
                  ... on VariableProduct {
                    onSale
                    content
                    regularPrice
                    allPaMinimumAantal {
                      nodes {
                        slug
                        name
                        id
                        databaseId
                      }
                    }
                    allPaMinimaleHoeveelheidM2 {
                      nodes {
                        name
                        id
                        databaseId
                      }
                    }
                    allPaKleurNaam {
                      nodes {
                        databaseId
                        id
                        name
                        slug
                      }
                    }
                    allPaKleur {
                      nodes {
                        databaseId
                        id
                        name
                        slug
                      }
                    }
                    allPaAfmetingen {
                      nodes {
                        databaseId
                        id
                        name
                        slug
                      }
                      edges {
                        node {
                          variations {
                            nodes {
                              id
                              image {
                                id
                                databaseId
                                sourceUrl
                              }
                              price
                              metaData {
                                key
                                value
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }`
          })
    });
    const { data } = await res.json()
    ////console.log(data)
    const getProductsBySlug = data
    return getProductsBySlug
  }