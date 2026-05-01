export const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[40vh] gap-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-gray-200"></div>
        <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-t-indigo-600 animate-spin"></div>
      </div>
      <span className="text-gray-500 font-medium animate-pulse tracking-widest uppercase text-xs">
        Cargando...
      </span>
    </div>
  );
};