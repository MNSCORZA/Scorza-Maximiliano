import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import CartItem from "./CartItem";

export const SideCart = () => {
  const { cart, cartOpen, closeCart } = useContext(CartContext);
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

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex justify-end">
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeCart}
      />

      <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
            <ShoppingBag size={20} />
            <span>Mi Carrito ({cart.length})</span>
          </h2>
          <button 
            onClick={closeCart}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <p className="text-slate-400 font-medium text-sm">Tu carrito está vacío</p>
              <button
                onClick={() => { closeCart(); navigate("/"); }}
                className="mt-4 text-xs font-bold text-slate-900 uppercase tracking-wider underline"
              >
                Ver productos
              </button>
            </div>
          ) : (
            cart.map((prod) => (
              <CartItem
                key={prod.id}
                item={{
                  id: prod.id,
                  titulo: prod.titulo,
                  precio: prod.precio,
                  cantidad: prod.cantidad,
                  imagenUrl: prod.imagenUrl,
                  stock: prod.stock
                }}
              />
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-slate-100 bg-white space-y-4 shrink-0 pb-8">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Subtotal</span>
              <span className="text-2xl font-black text-slate-900 tracking-tight">${total.toFixed(2)}</span>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => { closeCart(); navigate("/cart"); }}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-3 rounded-xl transition-all text-sm uppercase tracking-wider"
              >
                Ver Carrito Completo
              </button>
              <button
                onClick={() => { closeCart(); navigate("/form"); }}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl transition-all text-sm flex items-center justify-center gap-2 uppercase tracking-wider shadow-md"
              >
                <span>Iniciar Compra</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
