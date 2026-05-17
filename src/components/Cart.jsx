import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "./CartItem";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { ShoppingBag, Trash2, ArrowLeft, ArrowRight } from "lucide-react";

export const Cart = () => {
  const { cart, emptyCart } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const [recomendados, setRecomendados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const calculatedTotal = cart.reduce((acc, prod) => {
      const precio = typeof prod.precio === "number" ? prod.precio : parseFloat(prod.precio) || 0;
      const cantidad = typeof prod.cantidad === "number" ? prod.cantidad : parseInt(prod.cantidad) || 0;
      return acc + precio * cantidad;
    }, 0);
    setTotal(calculatedTotal);
  }, [cart]);

  useEffect(() => {
    const historial = JSON.parse(localStorage.getItem("historial_vistos")) || [];
    setRecomendados(historial);
  }, []);

  const HandleEmptyCart = () => {
    emptyCart();
    toast.info("El carrito se vació correctamente");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          
          <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-md border border-slate-100 text-center mx-auto mb-12">
            <div className="w-16 h-16 bg-slate-50 text-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={32} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">Tu carrito está vacío</h2>
            <p className="text-slate-400 text-sm mb-8">Parece que aún no has agregado ningún producto a tu compra.</p>
            <button
              onClick={() => navigate("/")}
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-md hover:bg-slate-800 transition-all active:scale-[0.98]"
            >
              Explorar catálogo
            </button>
          </div>

          {recomendados.length > 0 && (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between mb-6 px-2">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                  Productos que te interesaron
                </h3>
                <button 
                  onClick={() => navigate("/")} 
                  className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors underline flex items-center gap-1"
                >
                  <span>Ver más</span>
                  <ArrowRight size={12} />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {recomendados.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      navigate(`/item/${prod.id}`);
                      window.scrollTo(0, 0);
                    }}
                    className="group cursor-pointer bg-white border border-slate-100 rounded-2xl p-4 hover:shadow-md hover:border-slate-200 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-square w-full bg-slate-50/30 rounded-xl overflow-hidden mb-3 flex items-center justify-center border border-slate-100/50 p-2">
                        <img
                          src={prod.imagenUrl}
                          alt={prod.titulo}
                          className="max-h-24 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h4 className="text-xs font-bold text-slate-700 line-clamp-2 group-hover:text-slate-900 transition-colors leading-snug">
                        {prod.titulo}
                      </h4>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-50 flex items-baseline justify-between gap-1">
                      <span className="text-base font-black text-slate-900">
                        ${prod.precio}
                      </span>
                      <span className="text-[9px] font-black uppercase text-green-600 tracking-tight shrink-0">
                        Ver artículo
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-md shadow-slate-100/80 border border-slate-100 overflow-hidden">

          <div className="p-6 sm:p-8 border-b border-slate-100 flex justify-between items-center bg-white">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Tu Carrito <span className="text-slate-400 font-medium text-lg">({cart.length})</span>
            </h2>
            <button
              onClick={HandleEmptyCart}
              className="text-rose-500 hover:text-rose-600 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1"
            >
              <Trash2 size={14} />
              <span>Vaciar</span>
            </button>
          </div>

          <div className="p-4 sm:p-6 space-y-4">
            {cart.map((prod) => (
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
            ))}
          </div>

          <div className="p-6 sm:p-8 bg-slate-950 text-white">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="flex flex-col items-center sm:items-start">
                <span className="text-slate-400 text-[10px] uppercase font-black tracking-widest">Total a pagar</span>
                <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  ${total.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => navigate("/form")}
                className="w-full sm:w-auto bg-white hover:bg-slate-100 text-slate-950 font-black py-4 px-10 rounded-xl transition-all active:scale-[0.98] text-base flex items-center justify-center gap-2 shadow-lg shadow-black/10"
              >
                <span>Finalizar Compra</span>
                <svg xmlns="http://www.w3.org/2000/xl" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <button 
          onClick={() => navigate("/")}
          className="mt-6 flex items-center justify-center gap-2 text-slate-400 hover:text-slate-800 text-sm font-bold transition-colors w-full"
        >
          <ArrowLeft size={16} />
          <span>Continuar comprando</span>
        </button>
      </div>
    </main>
  );
};
