import { useState, useContext, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { createOrder } from "../fireBase/dataBase";

export function Formulario() {
  const { cart, emptyCart } = useContext(CartContext);
  const { user, userData } = useAuth();
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({ nombre: "", apellido: "", email: "", telefono: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && userData) {
      const nombreCompleto = userData.nombre || "";
      const partes = nombreCompleto.trim().split(" ");
      const nombreSolo = partes[0] || "";
      const apellidoSolo = partes.slice(1).join(" ") || "";

      setFormData({
        nombre: nombreSolo,
        apellido: userData.apellido || apellidoSolo || "",
        email: user.email || "",
        telefono: userData.telefono || "",
      });
    }
  }, [user, userData]);

  useEffect(() => {
    const calculatedTotal = cart.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    setTotal(calculatedTotal);
  }, [cart]);

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleFinalizarCompra = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const orderId = await createOrder(formData, cart, total, user?.uid || null);
      toast.success("¡Orden generada!");
      emptyCart();
      navigate(`/orden-confirmacion/${orderId}`);
    } catch (error) {
      console.error(error);
      toast.error("Error al procesar compra.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex justify-center items-center">
      <form onSubmit={handleFinalizarCompra} className="bg-white p-10 rounded-[2.5rem] shadow-2xl max-w-lg w-full space-y-6">
        <h2 className="text-3xl font-black text-center text-gray-900 uppercase tracking-tighter">Finalizar Compra</h2>
        
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Nombre</label>
            <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" className="w-full bg-gray-50 rounded-2xl py-4 px-5 font-bold outline-none border-2 border-transparent focus:border-indigo-600/20" required />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Apellido</label>
            <input name="apellido" value={formData.apellido} onChange={handleChange} placeholder="Apellido" className="w-full bg-gray-50 rounded-2xl py-4 px-5 font-bold outline-none border-2 border-transparent focus:border-indigo-600/20" required />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Email de contacto</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full bg-gray-50 rounded-2xl py-4 px-5 font-bold outline-none border-2 border-transparent focus:border-indigo-600/20" required />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Teléfono</label>
            <input name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Teléfono" className="w-full bg-gray-50 rounded-2xl py-4 px-5 font-bold outline-none border-2 border-transparent focus:border-indigo-600/20" required />
          </div>
        </div>

        <button disabled={loading} className="w-full bg-gray-900 text-white font-black uppercase py-5 rounded-2xl shadow-xl hover:bg-indigo-600 transition-all active:scale-95 disabled:opacity-50">
          {loading ? "Procesando..." : `Confirmar y Pagar $${total.toFixed(2)}`}
        </button>
      </form>
    </div>
  );
}
