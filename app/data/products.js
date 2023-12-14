export default async function getProducts(afmetingen, zoekOpdracht, categorie, aantal){

  const whereClauses = [];

  if(afmetingen) {
    const afmetingMetSpaties = afmetingen.split('x').join(' x ');
    whereClauses.push(`attribute: "pa_afmetingen", attributeTerm: "${afmetingMetSpaties}"`);
  }
    
  if(zoekOpdracht) {
    console.log(zoekOpdracht)
    const zoekFilter = zoekOpdracht.replace(/ /g, '-');
    console.log(zoekFilter)
    whereClauses.push(`search: "${zoekOpdracht}"`);
  }
  
  if(categorie) {
    whereClauses.push(`categoryIn: "${categorie}"`);
  }

  const res = await fetch(
    process.env.NEXT_PUBLIC_WORDPRESS_API_URL,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query:
    `query AllProducts {
      products(
        first: 100,
        where: { ${whereClauses.join(', ')} }
      ) {
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
      }`
        })
  });
  const { data } = await res.json()

  const getProducts = data.products.nodes

  return getProducts
}
