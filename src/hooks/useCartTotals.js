import { useState, useEffect } from "react";

export const useCartTotals = (cart) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calculatedTotal = cart.reduce((acc, prod) => {
      const precio = typeof prod.precio === "number" ? prod.precio : parseFloat(prod.precio) || 0;
      const cantidad = typeof prod.cantidad === "number" ? prod.cantidad : parseInt(prod.cantidad) || 0;
      return acc + precio * cantidad;
    }, 0);
    setTotal(calculatedTotal);
  }, [cart]);

  return total;
};
