import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "sonner";

const CartItem = ({ item }) => {
  const { updateItemQuantity, removeItem } = useContext(CartContext);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      updateItemQuantity(item.id, newQuantity);
    }
  };

  const handleRemoveClick = () => {
    toast.info("Producto eliminado del carrito");
    removeItem(item.id);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
      <div className="flex items-center space-x-5 w-full sm:w-auto">
        <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-gray-50 flex-shrink-0">
          <img
            src={item.imagenUrl}
            alt={item.titulo}
            className="w-24 h-24 object-contain transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/150?text=Sin+Imagen";
            }}
          />
        </div>

        <div className="flex-grow">
          <h3 className="font-bold text-lg text-gray-900 leading-tight">
            {item.titulo}
          </h3>
          <p className="text-indigo-600 font-black text-xl mt-1">
            ${item.precio}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between w-full sm:w-auto mt-4 sm:mt-0 gap-4">
        <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 p-1">
          <input
            type="number"
            id={`quantity-${item.id}`}
            min="1"
            value={item.cantidad}
            onChange={handleQuantityChange}
            className="w-16 bg-transparent border-none text-center text-lg font-bold text-gray-800 focus:ring-0 outline-none"
          />
        </div>

        <button
          onClick={handleRemoveClick}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-200 font-bold text-sm active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          <span className="hidden sm:inline">Eliminar</span>
        </button>
      </div>
    </div>
  );
};

export default CartItem;