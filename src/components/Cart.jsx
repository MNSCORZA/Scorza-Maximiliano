import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "./CartItem";
import { CartEmpty } from "./CartEmpty";
import { CartTotalBlock } from "./CartTotalBlock";
import { useCartTotals } from "../hooks/useCartTotals";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { Trash2, ArrowLeft } from "lucide-react";

export const Cart = () => {
  const { cart, emptyCart } = useContext(CartContext);
  const total = useCartTotals(cart);
  const navigate = useNavigate();

  const HandleEmptyCart = () => {
    emptyCart();
    toast('El carrito se vació correctamente', {
      duration: 3000,
      style: {
        borderRadius: '16px',
        padding: '12px 16px',
        background: '#0f172a',
        color: '#ffffff',
        border: 'none'
      }
    });
  };

  if (cart.length === 0) {
    return <CartEmpty />;
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

          <CartTotalBlock total={total} />
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
