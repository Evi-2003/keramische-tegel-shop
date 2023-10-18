import Image from 'next/image'
import { Inter } from 'next/font/google'
import { getProducts } from '@/lib/api.js'
const inter = Inter({ subsets: ['latin'] })

export default async function Home() {

  const res = await fetch(
    process.env.NEXT_PUBLIC_WORDPRESS_API_URL,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query:
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
          }`
        })
  });
  const { data } = await res.json()
  const products = data.products.nodes
  return (
    <main
      className="text-3xl text-slate-900 font-bold dark:text-slate-100 m-5 text-center"
    >
      <h1>Home</h1>
    </main>
  )
}
