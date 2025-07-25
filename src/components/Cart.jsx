import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "./CartItem";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export const Cart = () => {
  const { cart, emptyCart } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const calculatedTotal = cart.reduce((acc, prod) => {
      const precio =
        typeof prod.precio === "number"
          ? prod.precio
          : parseFloat(prod.precio) || 0;
      const cantidad =
        typeof prod.cantidad === "number"
          ? prod.cantidad
          : parseInt(prod.cantidad) || 0;
      return acc + precio * cantidad;
    }, 0);
    setTotal(calculatedTotal);
  }, [cart]);

  const HandleEmptyCart = () => {
    emptyCart();
    toast.info("El carrito se vació correctamente");
  };

  return (
    <div className=" container mx-auto p-6 md:p-8 max-w-4xl shadow-lg rounded-xl my-8 border border-gray-100 animate-fadeIn">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-gray-900 leading-tight">
        Tu Carrito de Compras 🛍️
      </h2>
      <hr className="mb-6 border-gray-200" />

      {cart.length === 0 ? (
        <p className="text-center text-lg md:text-xl text-gray-600 py-10">
          ¡Tu carrito está vacío! Explora nuestros productos y agrega tus
          favoritos. ✨
        </p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((prod) => (
              <CartItem
                key={prod.id}
                item={{
                  id: prod.id,
                  titulo: prod.titulo,
                  precio: prod.precio,
                  cantidad: prod.cantidad,
                  imagenUrl: prod.imagenUrl,
                }}
              />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-8 p-6 bg-blue-50 rounded-lg shadow-md border border-blue-100">
            <span className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-4 sm:mb-0">
              Total: <span className="text-green-700">${total.toFixed(2)}</span>
            </span>
            <button
              onClick={() => navigate("/form")}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-105 text-lg md:text-xl tracking-wide flex items-center justify-center space-x-2"
            >
              <span>Ir al Check Out</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
            <button
              onClick={HandleEmptyCart}
              className=" bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-105 text-lg md:text-xl tracking-wide flex items-center justify-center space-x-2"
            >
              Vaciar Carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
};
