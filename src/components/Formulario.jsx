import { useState, useContext, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { CartContext } from "../context/CartContext";

import { createOrder } from "../fireBase/dataBase";

export function Formulario() {
  const { cart, emptyCart } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const calculatedTotal = cart.reduce((acc, prod) => {
      const precio =
        typeof prod.precio === "number"
          ? prod.precio
          : parseFloat(prod.precio) || 0;
      const cantidad =
        typeof prod.cantidad === "number"
          ? prod.cantidad
          : parseInt(prod.cantidad) || 0;
      return acc + precio * cantidad;
    }, 0);
    setTotal(calculatedTotal);
  }, [cart]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleVaciarFormulario = () => {
    setFormData({
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
    });
    toast.info("Formulario vaciado correctamente.");
  };

  const handleFinalizarCompra = async (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.apellido || !formData.email) {
      toast.error(
        "Por favor, completa todos los campos obligatorios (Nombre, Apellido, Email)."
      );
      return;
    }
    if (cart.length === 0) {
      toast.error("Tu carrito está vacío. No puedes finalizar la compra.");
      return;
    }

    setLoading(true);

    try {
      const orderId = await createOrder(formData, cart, total);

      toast.success(
        `¡Compra finalizada con éxito! Tu número de orden es: ${orderId}`
      );

      emptyCart();
      navigate(`/orden-confirmacion/${orderId}`);
    } catch (error) {
      toast.error(
        "Hubo un error al finalizar tu compra. Por favor, inténtalo de nuevo.",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Información de Contacto y Envío
      </h2>
      <form onSubmit={handleFinalizarCompra} className="space-y-6">
        <div>
          <label
            htmlFor="nombre"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Ingresa tu nombre"
            disabled={loading}
          />
        </div>

        <div>
          <label
            htmlFor="apellido"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Apellido:
          </label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Ingresa tu apellido"
            disabled={loading}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="tu.email@ejemplo.com"
            disabled={loading}
          />
        </div>

        <div>
          <label
            htmlFor="telefono"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Teléfono:
          </label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Ej: +54 9 11 1234 5678"
            disabled={loading}
          />
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={handleVaciarFormulario}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            Vaciar Formulario
          </button>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Procesando..." : "Finalizar Compra"}
          </button>
        </div>
      </form>
    </div>
  );
}
