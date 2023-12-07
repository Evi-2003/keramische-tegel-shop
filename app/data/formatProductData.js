export default function formatProductData(product){


    //const data = product.allPaAfmetingen.nodes
  
    const productForCart = [
        {
            name: product.name,
            description: product.shortDescription,
            id: atob(product.id),
            slug: product.slug,
            price: parseInt(product.price) * 100,
            //alt: product.image.altText,
            currency: 'EUR',
            image: product.image,
            //attributes: product.attributess[0]
        

        }
    ]

    return productForCart
}

