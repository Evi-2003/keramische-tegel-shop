export default function formatProductData(
  product,
  m2Size,
  quantity,
  minimumM2Size,
  m2SizeCalculated
) {
  const prijsInDecimaal = parseFloat(product.price.replace(",", "."));
  const prijsInCenten = Math.round(prijsInDecimaal * 100);
  console.log("Prijs: " + prijsInCenten + " | Aantal (m2): " + m2Size);
  const productForCart = [
    {
      name: product.name,
      description: product.shortDescription,
      id: atob(product.id),
      price: prijsInCenten, // Prijs per m2
      hoeveelheid: Math.floor(quantity),
      minimumM2: minimumM2Size,
      m2: m2SizeCalculated,
      currency: "EUR",
    },
  ];

  return productForCart;
}
