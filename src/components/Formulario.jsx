import { useState, useContext, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { createOrder, deleteUserCart } from "../fireBase/dataBase";
import { useCartTotals } from "../hooks/useCartTotals";

export function Formulario() {
  const { cart, emptyCart } = useContext(CartContext);
  const { user, userData } = useAuth();
  const totalFallback = useCartTotals(cart);
  const location = useLocation();
  const navigate = useNavigate();

  const total = location.state?.totalFinalizado ?? totalFallback;

  const [formData, setFormData] = useState({ 
    nombre: "", 
    apellido: "", 
    email: "", 
    codArea: "",
    telefono: "",
    dni: "",
    direccion: "",
    cp: "",
    provincia: "Buenos Aires",
    localidad: "",
    depto: "",
    entreCalles: "",
    notas: ""
  });
  const [loading, setLoading] = useState(false);

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
        formData, 
        cart, 
        total, 
        user?.uid || null,
        activeCouponId || null
      );

      if (user?.uid) {
        await deleteUserCart(user.uid);
      }

      if (activeCouponId) {
        localStorage.removeItem("active_coupon_id");
      }

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
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex justify-center items-center">
      <form onSubmit={handleFinalizarCompra} className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-2xl max-w-4xl w-full space-y-6 my-6 md:my-12">
        <h2 className="text-2xl md:text-3xl font-black text-center text-gray-900 uppercase tracking-tighter">Finalizar Compra</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase text-indigo-600 tracking-wider border-b border-gray-100 pb-2">Datos Personales y Contacto</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Nombre</label>
                <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" className="w-full bg-gray-50 rounded-2xl py-3.5 px-5 font-bold outline-none border-2 border-transparent focus:border-indigo-600/20 text-sm" required />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Apellido</label>
                <input name="apellido" value={formData.apellido} onChange={handleChange} placeholder="Apellido" className="w-full bg-gray-50 rounded-2xl py-3.5 px-5 font-bold outline-none border-2 border-transparent focus:border-indigo-600/20 text-sm" required />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-2">DNI / CUIL</label>
              <input name="dni" value={formData.dni} onChange={handleChange} placeholder="Ej: 20-12345678-9" className="w-full bg-gray-50 rounded-2xl py-3.5 px-5 font-bold outline-none border-2 border-transparent focus:border-indigo-600/20 text-sm" required />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Email de contacto</label>
              <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full bg-gray-50 rounded-2xl py-3.5 px-5 font-bold outline-none border-2 border-transparent focus:border-indigo-600/20 text-sm" required />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1 col-span-1">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Cód. Área</label>
                <input name="codArea" value={formData.codArea} onChange={handleChange} placeholder="011" className="w-full bg-gray-50 rounded-2xl py-3.5 px-5 font-bold outline-none border-2 border-transparent focus:border-indigo-600/20 text-sm" required />
              </div>
              <div className="space-y-1 col-span-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Teléfono</label>
                <input name="telefono" value={formData.telefono} onChange={handleChange} placeholder="15 1234-5678" className="w-full bg-gray-50 rounded-2xl py-3.5 px-5 font-bold outline-none border-2 border-transparent focus:border-indigo-600/20 text-sm" required />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase text-indigo-600 tracking-wider border-b border-gray-100 pb-2">Datos de Entrega y Envío</h3>
            
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Dirección (Calle y Altura)</label>
              <input name="direccion" value={formData.direccion} onChange={handleChange} placeholder="Ej: Av. de Mayo 1234" className="w-full bg-gray-50 rounded-2xl py-3.5 px-5 font-bold outline-none border-2 border-transparent focus:border-indigo-600/20 text-sm" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Piso / Depto</label>
                <input name="depto" value={formData.depto} onChange={handleChange} placeholder="4° Piso C (Opcional)" className="w-full bg-gray-50 rounded-2xl py-3.5 px-5 font-bold outline-none border-2 border-transparent focus:border-indigo-600/20 text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Código Postal</label>
                <input name="cp" value={formData.cp} onChange={handleChange} placeholder="1754" className="w-full bg-gray-50 rounded-2xl py-3.5 px-5 font-bold outline-none border-2 border-transparent focus:border-indigo-600/20 text-sm" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Localidad</label>
                <input name="localidad" value={formData.localidad} onChange={handleChange} placeholder="San Justo" className="w-full bg-gray-50 rounded-2xl py-3.5 px-5 font-bold outline-none border-2 border-transparent focus:border-indigo-600/20 text-sm" required />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Provincia</label>
                <input name="provincia" value={formData.provincia} onChange={handleChange} placeholder="Buenos Aires" className="w-full bg-gray-50 rounded-2xl py-3.5 px-5 font-bold outline-none border-2 border-transparent focus:border-indigo-600/20 text-sm" required />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Entre Calles</label>
              <input name="entreCalles" value={formData.entreCalles} onChange={handleChange} placeholder="Arieta y Almafuerte" className="w-full bg-gray-50 rounded-2xl py-3.5 px-5 font-bold outline-none border-2 border-transparent focus:border-indigo-600/20 text-sm" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Notas para el repartidor</label>
              <textarea name="notas" value={formData.notas} onChange={handleChange} placeholder="Ej: Portón negro, tocar timbre dos veces..." rows={2} className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-3 px-5 text-sm font-bold text-slate-700 outline-none focus:bg-white focus:border-indigo-600/20 transition-all resize-none" />
            </div>
          </div>

        </div>

        <button disabled={loading} className="w-full bg-gray-900 text-white font-black uppercase py-5 rounded-2xl shadow-xl hover:bg-indigo-600 transition-all active:scale-95 disabled:opacity-50 mt-4">
          {loading ? "Procesando..." : `Confirmar y Pagar $${total.toLocaleString('es-AR')}`}
        </button>
      </form>
    </div>
  );
}
