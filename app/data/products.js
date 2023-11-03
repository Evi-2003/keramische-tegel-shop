export default async function getProducts(){
  const res = await fetch(
    process.env.NEXT_PUBLIC_WORDPRESS_API_URL,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query:
    `query AllProducts {
        products(first: 200) {
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