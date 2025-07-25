import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "sonner";

const CartItem = ({ item }) => {
  const { updateItemQuantity, removeItem } = useContext(CartContext);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);

    updateItemQuantity(item.id, newQuantity);
  };

  const handleRemoveClick = () => {
    toast.info("Producto eliminado del carrito");
    removeItem(item.id);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition duration-200 ease-in-out">
      <div className="flex items-center space-x-4 w-full sm:w-auto mb-3 sm:mb-0">
        <img
          src={item.imagenUrl}
          alt={item.titulo}
          className="w-20 h-20 object-cover rounded-md flex-shrink-0 border border-gray-200"
        />

        <div className="flex-grow text-center sm:text-left">
          <h3 className="font-semibold text-lg text-gray-800 leading-snug">
            {item.titulo}
          </h3>
          <p className="text-gray-600 font-medium text-md mt-1">
            ${item.precio}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-4 mt-3 sm:mt-0">
        <div className="flex items-center space-x-2">
          <label htmlFor={`quantity-${item.id}`} className="sr-only"></label>
          <input
            type="number"
            id={`quantity-${item.id}`}
            min="1"
            value={item.cantidad}
            onChange={handleQuantityChange}
            className="w-20 p-2 border border-gray-300 rounded-md text-center text-lg font-medium focus:ring-blue-400 focus:border-blue-400 transition duration-150 shadow-sm"
          />
        </div>

        <button
          onClick={handleRemoveClick}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out font-bold text-sm shadow-md flex items-center space-x-1"
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
          <span>Eliminar</span>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
