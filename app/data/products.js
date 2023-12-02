export default async function getProducts(afmetingen, zoekOpdracht){

  let afmetingFilter;
  let zoekFilter;
  function spatiesNaarStreepjes(input) {
    const result = input.replace(/ /g, '-');
    return result;
  }
  if(afmetingen != undefined){
    afmetingFilter = spatiesNaarStreepjes(afmetingen)
  }
  if(zoekOpdracht != undefined){
    zoekFilter = spatiesNaarStreepjes(zoekOpdracht)
 }
 //console.log(zoekFilter)
 //console.log(afmetingen)
  const res = await fetch(
    process.env.NEXT_PUBLIC_WORDPRESS_API_URL,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query:
    `query GetProducts {
      products(first: 12, where: { includeVariations: true ${zoekOpdracht ? `, search: "${zoekOpdracht}"` : ''} }){
        edges {
          node {
            id
            image {
              databaseId
              sourceUrl
            }
            ... on ProductVariation {
              onSale
              regularPrice
              databaseId
              id
              parent {
                node {
                  productId
                  ... on VariableProduct {
                    allPaKleurNaam {
                      nodes {
                        databaseId
                        id
                        name
                        slug
                        paKleurNaamId
                        variations {
                          nodes {
                            databaseId
                            id
                            price
                            salePrice
                            image {
                              sourceUrl
                              id
                              databaseId
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            ... on VariableProduct {
              onSale
              content
              regularPrice
              databaseId
              id
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
                  paKleurNaamId
                  variations {
                    nodes {
                      databaseId
                      id
                      price
                      salePrice
                      image {
                        sourceUrl
                        id
                        databaseId
                      }
                    }
                  }
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
                  variations {
                    nodes {
                      price(format: FORMATTED)
                      salePrice(format: FORMATTED)
                      onSale
                    }
                  }
                  products {
                    edges {
                      node {
                        id
                      }
                    }
                  }
                }
                edges {
                  node {
                    slug
                    variations {
                      edges {
                        node {
                          id
                          parent {
                            node {
                              id
                            }
                          }
                        }
                      }
                    }
                    id
                    databaseId
                    name
                    products {
                      edges {
                        node {
                          id
                        }
                      }
                    }
                  }
                }
              }
            }
            slug
            shortDescription
            name
            databaseId
          }
        }
      }
    }
    `
        })
  });
  const { data } = await res.json()

  const getProducts = data.products.edges

  
  function removeHtmlTags(str) {
    str = str.replace(/<[^>]*>/g, ''); // Remove HTML tags
    str = str.replace("€&nbsp;", ""); // Remove "€&nbsp;"
    return str;
  }

  return getProducts
}