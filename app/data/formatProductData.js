export default function formatProductData(product){
    const productForCart = [
        {
            name: product.name,
            description: product.shortDescription,
            id: product.databaseId,
            slug: product.slug,
            price: parseInt(product.price) * 100,
            alt: product.image.altText,
            currency: 'EUR',
            image: product.image.sourceUrl,
            attributes: product.attributes.nodes[0]

        }
    ]
    return productForCart
}