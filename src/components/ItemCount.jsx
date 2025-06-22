import { useState } from "react";

export const ItemCount = () => {
  const [count, setCount] = useState(0);
  const handleSuma = () => setCount(count + 1);
  const handleResta = () => count >1 ? setCount(count - 1) : setCount(0);

  return (
    <>
      <div className="flex justify-center m-4">
        <button
          onClick={handleResta}
          className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600/80"
        >
          -
        </button>

        <span className="mx-4 text-xl text-gray-50">{count}</span>
        <button
          onClick={handleSuma}
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600/80"
        >
          +
        </button>
      </div>
    </>
  );
};
