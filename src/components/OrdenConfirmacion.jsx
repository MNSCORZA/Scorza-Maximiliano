import { useParams, Link } from "react-router";

export function OrdenConfirmacion() {
  const { orderId } = useParams();

  return (
    <div className="text-center p-10 bg-white rounded-lg shadow-xl max-w-2xl mx-auto my-10">
      <h2 className="text-4xl font-extrabold text-green-700 mb-4 animate-bounce-in">
        ¡Gracias por tu compra! 🎉
      </h2>
      <p className="text-lg text-gray-700 mb-6">
        Tu orden ha sido procesada exitosamente.
      </p>
      <p className="text-xl font-semibold text-gray-800 mb-8 break-words">
        Número de Orden:{" "}
        <span className="text-indigo-600 font-extrabold select-all">
          {orderId}
        </span>
      </p>
      <div className="flex justify-center">
        <Link
          to="/"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg 
                     transform transition duration-300 ease-in-out hover:scale-105 text-lg"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}
