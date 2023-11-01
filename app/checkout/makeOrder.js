export default async function makeOrder(order){
    const res = await fetch(
        'https://dev.webchange.nl/wp-json/wc/v3/orders',{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${process.env.NEXT_WOOCOMMERCE_KEY}:${process.env.NEXT_WOOCOMMERCE_SECRET}`,
          },
          body: JSON(
            {
                "payment_method": "mollie_wc_gateway_ideal",
                "payment_method_title": "Mollie - iDEAL",
                "billing": {
                  "first_name": order.voornaam,
                  "last_name": order.achternaam,
                  "address_1": order.adres,
                  "address_2": "",
                  "city": order.stad,
                  "state": order.provincie,
                  "postcode": order.postcode,
                  "country": order.land,
                  "email": order.e-mail,
                  "phone": order.telefoonnummer
                },
                "shipping": {
                  "first_name": order.voornaam,
                  "last_name": order.achternaam,
                  "address_1": order.adres,
                  "address_2": "",
                  "city": order.stad,
                  "state": order.provincie,
                  "postcode": order.postcode,
                  "country": order.land,
                  "email": order.e-mail,
                  "phone": order.telefoonnummer
                },
                "line_items": order.line_items,
                "shipping_lines": [
                  {
                    "method_id": "flat_rate",
                    "method_title": "Flat Rate",
                    "total": "90.00"
                  }
                ]
              }              
          )
      });
      const { data } = await res.json()
      console.log(data)
      return data
}