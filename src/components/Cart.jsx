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
      const precio = typeof prod.precio === "number" ? prod.precio : parseFloat(prod.precio) || 0;
      const cantidad = typeof prod.cantidad === "number" ? prod.cantidad : parseInt(prod.cantidad) || 0;
      return acc + precio * cantidad;
    }, 0);
    setTotal(calculatedTotal);
  }, [cart]);

  const HandleEmptyCart = () => {
    emptyCart();
    toast.info("El carrito se vació correctamente");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl border border-gray-100 text-center">
          <div className="text-6xl mb-6">🛍️</div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">Tu carrito está vacío</h2>
          <p className="text-gray-500 mb-8">Parece que aún no has agregado nada a tu compra.</p>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
          >
            Explorar productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-6 sm:p-10 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              Tu Carrito <span className="text-indigo-600">({cart.length})</span>
            </h2>
            <button
              onClick={HandleEmptyCart}
              className="text-red-500 hover:text-red-700 font-bold text-sm uppercase tracking-wider transition-colors"
            >
              Vaciar
            </button>
          </div>

          <div className="p-4 sm:p-8 space-y-6">
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

          <div className="p-6 sm:p-10 bg-gray-900 text-white">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="flex flex-col items-center sm:items-start">
                <span className="text-gray-400 text-sm uppercase font-bold tracking-widest">Total a pagar</span>
                <span className="text-4xl sm:text-5xl font-black text-white">
                  ${total.toFixed(2)}
                </span>
              </div>
              
              <button
                onClick={() => navigate("/form")}
                className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-400 text-white font-black py-5 px-12 rounded-2xl shadow-2xl transition-all transform active:scale-95 text-xl flex items-center justify-center gap-3"
              >
                <span>Finalizar Compra</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => navigate("/")}
          className="mt-8 flex items-center justify-center gap-2 text-gray-500 hover:text-indigo-600 font-bold transition-colors w-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Continuar comprando
        </button>
      </div>
    </main>
  );
};