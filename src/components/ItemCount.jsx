import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

export const ItemCount = ({ item }) => {
  const [count, setCount] = useState(1);
  const { addToCart } = useContext(CartContext);

  const handleSuma = () => setCount(count + 1);
  const handleResta = () => (count > 1 ? setCount(count - 1) : setCount(1));
  const handleAddToCart = () => addToCart({...item, cantidad: count});

  return (
    <>
      <div className="flex justify-center gap-2 ">
        <button
          onClick={handleResta}
          className="bg-black/30 border rounded-xl text-gray-500 p-2  hover:text-black hover:border-black hover:border hover:bg-white hover:cursor-pointer"
        >
          -
        </button>

        <span className="mx-4 text-xl text-gray-50">{count}</span>
        <button
          onClick={handleSuma}
          className="bg-black/30 border rounded-xl p-2 text-gray-500 hover:text-black hover:border-black hover:border hover:bg-white hover:cursor-pointer"
        >
          +
        </button>
        <button
          onClick={handleAddToCart}
          className="bg-black/30 border rounded-full p-2 text-gray-500 hover:text-black hover:border-black hover:border hover:bg-white hover:cursor-pointer"
        >
          Agregar
        </button>
      </div>
    </>
  );
};
