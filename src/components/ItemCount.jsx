// ... (imports iguales)

export const ItemCount = ({ item }) => {
  // ... (lógica handle igual)

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between bg-white rounded-xl p-1.5 border border-gray-200">
        <button
          onClick={handleResta}
          className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-lg text-gray-400 hover:text-blue-600 transition-all"
        >
          <Minus size={16} strokeWidth={3} />
        </button>

        <span className="text-xl font-black text-gray-900">{count}</span>

        <button
          onClick={handleSuma}
          className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-lg text-gray-400 hover:text-blue-600 transition-all"
        >
          <Plus size={16} strokeWidth={3} />
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        className="group relative w-full bg-blue-600 text-white font-black py-4 px-6 rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all overflow-hidden"
      >
        <div className="flex items-center justify-center gap-3 relative z-10">
          <ShoppingCart size={18} strokeWidth={2.5} />
          <span className="uppercase tracking-widest text-xs">Agregar al carrito</span>
        </div>
      </button>
    </div>
  );
};
