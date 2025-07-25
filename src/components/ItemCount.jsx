import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "sonner";

export const ItemCount = ({ item }) => {
  const [count, setCount] = useState(1);
  const { addToCart } = useContext(CartContext);

  const handleSuma = () => setCount(count + 1);
  const handleResta = () => (count > 1 ? setCount(count - 1) : setCount(1));
  const handleAddToCart = () => {
    addToCart({ ...item, cantidad: count });
    toast.success(`${item.title} se agregó al carrito!`, {
      description: `Cantidad: ${count}`,
      duration: 4000,
    });
  };

  return (
    <>
      <div className="flex items-center justify-center gap-15 ">
        <button
          onClick={handleResta}
          className="bg-gray-300 border rounded-full  text-gray-900 p-2 shadow-neutral-700 border-gray-900 hover:text-white hover:cursor-pointer hover:bg-indigo-700"
        >
          -
        </button>

        <span className="mx-4 text-2xl text-gray-900">{count}</span>
        <button
          onClick={handleSuma}
          className="bg-gray-300 border text-2xl  text-gray-900 p-2 shadow-neutral-700 border-gray-900 rounded-full hover:text-white  hover:cursor-pointer hover:bg-indigo-700"
        >
          +
        </button>
        <button
          onClick={handleAddToCart}
          className=" toast-button bg-gray-300 border rounded-xl text-2xl text-gray-900 p-2 shadow-neutral-700 border-gray-900 hover:text-white  hover:cursor-pointer hover:bg-indigo-700"
        >
          Agregar
        </button>
      </div>
    </>
  );
};
