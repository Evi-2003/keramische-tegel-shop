import Stripe from 'stripe';
import { headers } from 'next/headers'

export async function POST(request) {
  if (!process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key is not defined.");
  }
  console.log(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
  });
  try {
    const cartProducts = await request.json()

    function formatLineItems(cartProducts) {
      return Object.values(cartProducts).map(product => ({
        price_data: {
          currency: product.currency,
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: product.price, // use unit_amount instead of price
        },
        quantity: product.quantity,
      }));
    }

    const line_items = formatLineItems(cartProducts)


    console.log(line_items);
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      submit_type: 'pay',
      line_items,
      allow_promotion_codes: true,
      shipping_address_collection: {
        allowed_countries: ['NL'],
        
      },
      success_url: `${headers().get('origin')}/success`,
      cancel_url: `${headers().get('origin')}/`,
    })

    return Response.json({ sessionId: checkoutSession.id })
  } catch (err) {
    console.log('POST checkout session error:', err)
    return Response.json({ error: { message: err.message } }, 400)
  }
}
