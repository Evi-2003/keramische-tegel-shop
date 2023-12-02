export default async function getInspiratieFotos(){
    const res = await fetch(
      'https://dev.webchange.nl/graphql',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query:
          `
          query getInspiratieFotos {
            post(id: "830", idType: DATABASE_ID) {
              id
              gallerij {
                inspiratie {
                  sourceUrl(size: LARGE)
                }
              }
            }
          }
          `
        })
  });
  const { data } = await res.json()

  const products = data.post.gallerij.inspiratie

  return products
}