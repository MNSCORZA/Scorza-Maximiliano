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
      const precio = typeof prod.precio === "number" ? prod.precio : parseFloat(prod.precio) || 0;
      const cantidad = typeof prod.cantidad === "number" ? prod.cantidad : parseInt(prod.cantidad) || 0;
      return acc + precio * cantidad;
    }, 0);
    setTotal(calculatedTotal);
  }, [cart]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validación de entrada para evitar caracteres inválidos mientras escribe
    if (name === "nombre" || name === "apellido") {
      if (/[0-9]/.test(value)) return;
    }
    if (name === "telefono") {
      if (/[a-zA-Z]/.test(value)) return;
    }

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFinalizarCompra = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.nombre.trim() || !formData.apellido.trim()) {
      toast.error("Por favor, ingresa tu nombre completo.");
      return;
    }
    if (!emailRegex.test(formData.email)) {
      toast.error("El formato del correo electrónico no es válido.");
      return;
    }
    if (formData.telefono.length < 8) {
      toast.error("El número de teléfono es demasiado corto.");
      return;
    }

    setLoading(true);
    try {
      const orderId = await createOrder(formData, cart, total);
      toast.success(`¡Orden generada! Código: ${orderId}`);
      emptyCart();
      navigate(`/orden-confirmacion/${orderId}`);
    } catch (error) {
      toast.error("Error en el servidor. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 sm:p-8 bg-gray-50">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-indigo-600 p-8 text-center text-white">
          <h2 className="text-3xl font-black">Datos de Envío</h2>
          <p className="opacity-90 mt-2">Cuidamos la precisión de tus datos para tu entrega</p>
        </div>

        <form onSubmit={handleFinalizarCompra} className="p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Nombre */}
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-1">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 outline-none transition-all"
                placeholder="Ej: Juan Román"
                disabled={loading}
              />
              <span className="text-[10px] text-gray-400 mt-1 uppercase font-semibold">Sin números ni símbolos</span>
            </div>

            {/* Apellido */}
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-1">Apellido</label>
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 outline-none transition-all"
                placeholder="Ej: Riquelme"
                disabled={loading}
              />
              <span className="text-[10px] text-gray-400 mt-1 uppercase font-semibold">Usar solo letras</span>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-700 mb-1">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 outline-none transition-all"
              placeholder="usuario@gmail.com"
              disabled={loading}
            />
            <span className="text-[10px] text-gray-400 mt-1 uppercase font-semibold">Ej: nombre@empresa.com</span>
          </div>

          {/* Teléfono */}
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-700 mb-1">Teléfono de Contacto</label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 outline-none transition-all"
              placeholder="11 2345 6789"
              disabled={loading}
            />
            <span className="text-[10px] text-gray-400 mt-1 uppercase font-semibold">Código de área + número (sin letras)</span>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transform active:scale-95 transition-all disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Verificando..." : `Confirmar y Pagar $${total.toFixed(2)}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}