import React from "react";
import { useNavigate } from "react-router";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50  text-gray-100  p-4">
      <div className=" text-center bg-gray-800 rounded-lg shadow-xl p-8 md:p-12 max-w-md w-full">
        <h1 className="text-8xl md:text-9xl font-extrabold text-red-600 mb-4">
          404 😕
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          ¡Página no encontrada!
        </h2>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Lo sentimos, la página que estás buscando no existe o se ha movido.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};
