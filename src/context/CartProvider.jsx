import { CartContext } from "./CartContext";
import { useState, useEffect } from "react";

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productToAdd) => {
    const existingProductIndex = cart.findIndex(
      (item) => item.id === productToAdd.id
    );

    if (existingProductIndex !== -1) {
      const updatedCart = cart.map((item, index) => {
        if (index === existingProductIndex) {
          const quantityToAdd = productToAdd.cantidad || 1;
          return {
            ...item,
            cantidad: (item.cantidad || 0) + quantityToAdd,
          };
        }
        return item;
      });
      setCart(updatedCart);
    } else {
      const newProduct = {
        ...productToAdd,
        cantidad: productToAdd.cantidad || 1,
      };
      setCart([...cart, newProduct]);
    }
  };

  const updateItemQuantity = (productId, newQuantity) => {
    if (typeof newQuantity !== "number" || newQuantity < 0 || isNaN(newQuantity)) return;

    if (newQuantity === 0) {
      removeItem(productId);
      return;
    }

    const updatedCart = cart.map((product) => {
      if (product.id === productId) {
        return { ...product, cantidad: newQuantity };
      }
      return product;
    });
    setCart(updatedCart);
  };

  const getCantidad = () => {
    return cart.reduce((acc, product) => {
      const cantidad = typeof product.cantidad === "number" ? product.cantidad : parseInt(product.cantidad) || 0;
      return acc + cantidad;
    }, 0);
  };

  const removeItem = (productId) => {
    setCart(cart.filter((product) => product.id !== productId));
  };

  const emptyCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        getCantidad,
        removeItem,
        updateItemQuantity,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}