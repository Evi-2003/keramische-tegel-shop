"use client";
import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";
import { useState } from "react";

export default function CartItem({ item }) {
  const { name, quantity, price, attributes } = item;
  const { removeItem, setItemQuantity } = useShoppingCart();
  const [editQuantity, setEditQuantity] = useState(item.quantity);
  const [editMode, setEditMode] = useState(false);
  const removeItemFromCart = () => {
    removeItem(item.id);
  };
  const handleBlur = () => {
    setItemQuantity(item.id, editQuantity);
    setEditMode(false);
  };

  return (
    <>
      <tr className="border-y-[1px]">
        <td className="w-fit">
          {" "}
          {name !== "Verzendkosten" && (
            <button
              className="bg-red-500 text-slate-100 rounded-full w-5 h-5 flex items-center justify-center"
              onClick={removeItemFromCart}
              aria-label={"Verwijder " + name + " uit je winkelmand"}
            >
              -
            </button>
          )}
        </td>

        <td data-label="Product" className="py-3 lg:px-5">
          {name}
        </td>
        <td data-label="Prijs" className="py-3 lg:px-5">
          €{((price * quantity) / 100).toFixed(2)},-
        </td>
        <td data-label="Aantal (m2)" className="py-3  lg:px-5 content-between">
          {editMode ? (
            <input
              type="number"
              value={editQuantity}
              onChange={(e) => setEditQuantity(+e.target.value)}
              onBlur={handleBlur} // Dit zal de nieuwe hoeveelheid opslaan en de edit modus uitschakelen.
            />
          ) : (
            <span onClick={() => setEditMode(true)}>{item.quantity}</span>
          )}
        </td>
      </tr>
    </>
  );
}
