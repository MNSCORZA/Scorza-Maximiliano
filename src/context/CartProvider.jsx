import { CartContext } from "./CartContext";
import { useState } from "react";

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (productToAdd) => {
    const existingProductIndex = cart.findIndex(
      (item) => item.id === productToAdd.id
    );

    if (existingProductIndex !== -1) {
      const updatedCart = cart.map((item, index) => {
        if (index === existingProductIndex) {
          const quantityToAdd = productToAdd.cantidad
            ? productToAdd.cantidad
            : 1;
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
    if (
      typeof newQuantity !== "number" ||
      newQuantity < 0 ||
      isNaN(newQuantity)
    ) {
      return;
    }

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
    if (cart.length === 0) {
      return 0;
    }

    const suma = cart.reduce((acc, product) => {
      const cantidadDelProducto =
        typeof product.cantidad === "number"
          ? product.cantidad
          : parseInt(product.cantidad) || 0;
      return acc + cantidadDelProducto;
    }, 0);
    return suma;
  };

  const removeItem = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
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
