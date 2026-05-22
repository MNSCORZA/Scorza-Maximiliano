import { useState, useContext, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { createOrder, deleteUserCart } from "../fireBase/dataBase";
import { useCartTotals } from "../hooks/useCartTotals";
import { PersonalDataFields } from "./PersonalDataFields";
import { ShippingFields } from "./ShippingFields";

export function Formulario() {
  const { cart, emptyCart } = useContext(CartContext);
  const { user, userData } = useAuth();
  const totalFallback = useCartTotals(cart);
  const location = useLocation();
  const navigate = useNavigate();

  const total = location.state?.totalFinalizado ?? totalFallback;

  const [formData, setFormData] = useState({ 
    nombre: "", apellido: "", email: "", codArea: "", telefono: "", dni: "",
    direccion: "", cp: "", provincia: "Buenos Aires", localidad: "", depto: "",
    entreCalles: "", notas: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && userData) {
      const nombreCompleto = userData.nombre || "";
      const partes = nombreCompleto.trim().split(" ");
      setFormData({
        nombre: partes[0] || "",
        apellido: userData.apellido || partes.slice(1).join(" ") || "",
        email: user.email || "",
        codArea: userData.codArea || "",
        telefono: userData.telefono || "",
        dni: userData.dni || "",
        direccion: userData.direccion || "",
        cp: userData.cp || "",
        provincia: userData.provincia || "Buenos Aires",
        localidad: userData.localidad || "",
        depto: userData.depto || "",
        entreCalles: userData.entreCalles || "",
        notas: userData.notas || ""
      });
    }
  }, [user, userData]);

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleFinalizarCompra = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const activeCouponId = localStorage.getItem("active_coupon_id");

      const orderId = await createOrder(
        formData, cart, total, user?.uid || null, activeCouponId || null
      );

      if (user?.uid) await deleteUserCart(user.uid);

      localStorage.removeItem("active_coupon_id");
      localStorage.removeItem("active_coupon_pct");
      localStorage.removeItem("active_coupon_min");

      toast.success("¡Orden generada!");
      emptyCart();
      navigate(`/orden-confirmacion/${orderId}`);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error al procesar compra.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex justify-center items-center">
      <form onSubmit={handleFinalizarCompra} className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-2xl max-w-4xl w-full space-y-6 my-6 md:my-12">
        <h2 className="text-2xl md:text-3xl font-black text-center text-gray-900 uppercase tracking-tighter">Finalizar Compra</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PersonalDataFields formData={formData} onChange={handleChange} />
          <ShippingFields formData={formData} onChange={handleChange} />
        </div>

        <button disabled={loading} className="w-full bg-gray-900 text-white font-black uppercase py-5 rounded-2xl shadow-xl hover:bg-indigo-600 transition-all active:scale-95 disabled:opacity-50 mt-4">
          {loading ? "Procesando..." : `Confirmar y Pagar $${total.toLocaleString('es-AR')}`}
        </button>
      </form>
    </div>
  );
}
