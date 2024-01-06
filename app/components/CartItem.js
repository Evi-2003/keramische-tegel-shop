"use client";
import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";
import { useState } from "react";

export default function CartItem({ item }) {
  const { name, quantity, price, attributes } = item;
  const { removeItem, setItemQuantity } = useShoppingCart();
  const [editQuantity, setEditQuantity] = useState(item.quantity);
  const [editMode, setEditMode] = useState(false);
  const minimumM2 = item.minimumM2;
  const m2 = item.m2; // the product is 0.36 m2, if the
  console.log(m2);
  const removeItemFromCart = () => {
    removeItem(item.id);
  };

  const roundUpToMultiples = (number, multiple) => {
    number = Number(number.toFixed(2));
    multiple = Number(multiple.toFixed(2));
    const times = Math.floor((number * 100) / (multiple * 100));
    const roundedNumber =
      (number * 100) % (multiple * 100) === 0 ? number : (times + 1) * multiple;
    return Number(roundedNumber.toFixed(2));
  };
  const debounce = (func, wait) => {
    let timeout;

    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const handleBlur = () => {
    let adjustedQuantity = editQuantity;

    if (adjustedQuantity !== 0 && adjustedQuantity % m2 !== 0) {
      adjustedQuantity = roundUpToMultiples(editQuantity, m2);
    }

    if (minimumM2 > adjustedQuantity) {
      adjustedQuantity = minimumM2;
    }

    setEditQuantity(adjustedQuantity);
    setItemQuantity(item.id, adjustedQuantity);
    setEditMode(false);
  };
  const handleKeydown = (e) => {
    if (e.keyCode === 13) {
      // enter key
      handleBlur();
    }
  };
  const handleMinus = () => {
    if (name !== "Verzendkosten") {
      let newQuantity = item.quantity - 1;
      if (newQuantity < minimumM2) {
        newQuantity = minimumM2;
      }

      setEditQuantity(newQuantity);
      setItemQuantity(item.id, newQuantity);
    }
  };

  const handlePlus = () => {
    if (name !== "Verzendkosten") {
      const newQuantity = item.quantity + 1;
      setEditQuantity(newQuantity);
      setItemQuantity(item.id, newQuantity);
    }
  };

  return (
    <>
      <tr className="border-y-[1px]">
        <td className="w-fit">
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

        <td data-label="Product" className="py-3 lg:px-2">
          {name}
        </td>
        <td data-label="Prijs" className="py-3 lg:px-2">
          €{((price * quantity) / 100).toFixed(2)},-
        </td>
        <td
          data-label="Aantal (m2)"
          className="py-3 lg:px-2 flex items-center justify-center w-full"
        >
          <div className="w-fit flex self-center">
            {name !== "Verzendkosten" && (
              <button onClick={handleMinus}>-</button>
            )}
            {editMode ? (
              <input
                type="number"
                onChange={(e) => setEditQuantity(parseFloat(e.target.value))}
                onBlur={handleBlur}
                disabled={name === "Verzendkosten"}
                className="w-[50px] text-center"
              />
            ) : (
              <span
                onClick={() => name !== "Verzendkosten" && setEditMode(true)}
                className={
                  name !== "Verzendkosten"
                    ? "underline underline-offset-4 mx-3"
                    : ""
                }
              >
                {item.quantity.toFixed(2)}
              </span>
            )}
            {name !== "Verzendkosten" && (
              <button onClick={handlePlus}>+</button>
            )}
          </div>
        </td>
      </tr>
    </>
  );
}
