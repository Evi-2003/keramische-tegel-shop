export default function formatProductData(product, quantity){
    const prijsInDecimaal = parseFloat(product.price.replace(",", "."));
    const prijsInCenten = Math.round(prijsInDecimaal * 100);
    const productForCart = [
        {
            name: product.name,
            description: product.shortDescription,
            id: atob(product.id),
            price: prijsInCenten,
            currency: 'EUR',
        }
    ]

    return productForCart
}

