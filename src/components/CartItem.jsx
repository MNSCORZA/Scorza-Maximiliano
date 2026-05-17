import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "sonner";
import { Minus, Plus, Trash2 } from "lucide-react";

const CartItem = ({ item }) => {
  const { updateItemQuantity, removeItem } = useContext(CartContext);

  const handleSuma = () => {
    if (!item.stock || item.cantidad < item.stock) {
      updateItemQuantity(item.id, item.cantidad + 1);
    } else {
      toast.error("Límite de stock alcanzado");
    }
  };

  const handleResta = () => {
    if (item.cantidad > 1) {
      updateItemQuantity(item.id, item.cantidad - 1);
    }
  };

  const handleRemoveClick = () => {
    toast.info("Producto eliminado del carrito");
    removeItem(item.id);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 hover:shadow-sm transition-all duration-300 gap-4">
      <div className="flex items-center space-x-4 w-full sm:w-auto">
        <div className="relative overflow-hidden rounded-xl border border-slate-100 bg-slate-50 flex-shrink-0 w-20 h-20 flex items-center justify-center p-2 mix-blend-multiply">
          <img
            src={item.imagenUrl}
            alt={item.titulo}
            className="max-h-full max-w-full object-contain"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/150?text=Sin+Imagen";
            }}
          />
        </div>

        <div className="flex-grow min-w-0">
          <h3 className="font-bold text-base text-slate-900 truncate uppercase tracking-tight">
            {item.titulo}
          </h3>
          <p className="text-slate-900 font-black text-lg mt-0.5">
            ${item.precio}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-50">
        <div className="flex items-center bg-slate-50 rounded-xl p-1 border border-slate-200/60 shadow-sm">
          <button
            onClick={handleResta}
            disabled={item.cantidad <= 1}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-900 disabled:opacity-30 transition-colors"
          >
            <Minus size={14} strokeWidth={2.5} />
          </button>

          <span className="text-sm font-black text-slate-900 tabular-nums px-3">
            {item.cantidad}
          </span>

          <button
            onClick={handleSuma}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-900 transition-colors"
          >
            <Plus size={14} strokeWidth={2.5} />
          </button>
        </div>

        <button
          onClick={handleRemoveClick}
          className="w-10 h-10 flex items-center justify-center bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all active:scale-95 shadow-sm border border-rose-100/50"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
