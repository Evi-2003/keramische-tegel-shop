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
        first: 12${afmetingFilter ? `, where: { attribute: "pa_afmetingen", attributeTerm: "${afmetingen}" }` : '' || zoekFilter ? `, where: { search: "${zoekFilter}" }` : ''}
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

  function removeHtmlTags(str) {
    str = str.replace(/<[^>]*>/g, ''); // Remove HTML tags
    str = str.replace("€&nbsp;", ""); // Remove "€&nbsp;"
    return str;
  }

  return getProducts
}