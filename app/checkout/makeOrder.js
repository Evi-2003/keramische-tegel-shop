'use server'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
export default async function makeOrder(line_items, order){
    let betalen;
    const winkelmand = Object.entries(line_items)
    const formattedItems = winkelmand.map(([productId, item]) => ({
        product_id: productId,
        quantity: item.quantity
      }));
      
    try{
    const res = await fetch(
        'https://betalen.keramischetegelshop.nl/wp-json/wc/v3/orders',{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${Buffer.from(`${process.env.NEXT_WOOCOMMERCE_KEY}:${process.env.NEXT_WOOCOMMERCE_SECRET}`).toString('base64')}`
          },
          body: JSON.stringify(
            {
                "payment_method": "mollie_wc_gateway_ideal",
                "payment_method_title": "Mollie - iDEAL",
                "billing": {
                  "first_name": order.get('voornaam'),
                  "last_name": order.get('achternaam'),
                  "address_1": order.get('adres'),
                  "address_2": "",
                  "city": order.get('plaats'),
                  "postcode": order.get('postcode'),
                  "country": 'NL',
                  "email": order.get('mail'),
                  "phone": order.get('nummer'),
                },
                "shipping": {
                  "first_name": order.get('voornaam'),
                  "last_name": order.get('achternaam'),
                  "address_1": order.get('adres'),
                  "address_2": "",
                  "city": order.get('plaats'),
                  "postcode": order.get('postcode'),
                  "country": 'NL',
                  "email": order.get('mail'),
                  "phone": order.get('nummer'),
                },
                "line_items": formattedItems,
                "shipping_lines": [
                  {
                    "method_id": "Verzendkosten",
                    "method_title": "Verzendkosten",
                    "total": "90.00"
                  }
                ]
              }              
          )
      });
      if (res.ok) {
        const data = await res.json();
        betalen = data.payment_url
      } else {
        console.error(`Er is wat misgegaan ${res.status}`);
      }
    } catch (error) {
      console.error("Er is iets fout gegaan", error);
    }
    redirect(betalen)
}