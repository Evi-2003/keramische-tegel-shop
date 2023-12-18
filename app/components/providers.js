"use client";

import React from "react";
import { CartProvider as USCProvider } from "use-shopping-cart";

function CartProvider({ children }) {
  return (
    <USCProvider
      mode="checkout-session"
      currency={"EUR"}
      allowedCountries={["NL"]}
      billingAddressCollection={true}
    >
      {children}
    </USCProvider>
  );
}

export default CartProvider;
