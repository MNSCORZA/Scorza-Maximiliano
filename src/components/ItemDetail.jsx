import { ItemCount } from "./ItemCount";
import { Loader } from "./Loader";

export const ItemDetail = ({ item }) => {
  if (!item) {
    return <Loader />;
  }

  const sinImpuestos = typeof item.precio === "number" ? item.precio / 1.21 : 0;

  return (
    <div className=" flex m-8 bg-white border border-gray-200 rounded-lg shadow-xl">
      <img className=" h-150 w-150 " src={item.imagenUrl} alt={item.titulo} />
      <div className=" flex flex-col items-center justify-center w-full p-6 gap-10">
        <h1 className="flex mb-8 mt-8 font-bold tracking-tight text-gray-900  text-5xl m-6">
          {item.titulo}
        </h1>
        <p className="m-3 font-semibold text-3xl text-gray-900 ">
          {item.descripcion}
        </p>
        <div className="flex m-4 p-4 gap-50 text-gray-900 ">
          <span className="flex flex-col items-center gap-6">
            <p className="text-3xl">${item.precio}</p>
            <p className="text-1xl">
              Valor sin impuestos ${sinImpuestos.toFixed(2)}
            </p>
          </span>

          <p className="text-2xl">{item.stock}</p>
        </div>
        <div className="flex gap-10 mb-10">
          <ItemCount item={item} />
        </div>
      </div>
    </div>
  );
};
