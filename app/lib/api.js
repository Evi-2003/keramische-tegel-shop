const API_URL = process.env.WORDPRESS_API_URL;
async function fetchAPI(query, { variables } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      "Authorization"
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}
export async function getProducts() {
  const productsFetch = await fetchAPI(
    `query AllProducts {
            products {
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
              }
            }
          }`,
    {
      variables: {},
    }
  );
  return productsFetch?.products?.nodes;
}
export async function getPosts() {
  const data = await fetchAPI(
    `query AllPosts {
          posts(first: 20) {
            edges {
              node {
                title
                categories{
                edges{
                    node{
                    name
                    }
                }
                }
                excerpt
                slug
                author {
                  node {
                    name
                    firstName
                    lastName
                  }
                }
              }
            }
          }
        }
      `,
    {
      variables: {},
    }
  );
  return data?.posts?.edges;
}

export async function getProductSlugs() {
  const productsFetch = await fetchAPI(
    `query getProductSlugs {
            products {
              nodes {
                slug
              }
            }
          }`,
    {
      variables: {},
    }
  );

  const paths = productsFetch?.products?.nodes.map((node) => ({
    params: { slug: node.slug },
  }));

  return paths;
}


  
export async function getProductData(slug) {
    const productData = await fetchAPI(
      `
      query getProductData($slug: ID!) {
          product(id: $slug, idType: SLUG) {
              id
              slug
              name
              description
              shortDescription
              image {
                altText
                sourceUrl
              }
          }
      }`,
      { variables: { slug } }
    );
  
    return productData?.product;
  }

