export default function formatProductData(product){
    const productForCart = [
        {
            name: product.name,
            description: product.shortDescription,
            id: product.id,
            price: parseInt(product.price) * 100,
            alt: product.image.altText,
            currency: 'EUR',
            image: product.image.sourceUrl
        }
    ]
    return productForCart
}