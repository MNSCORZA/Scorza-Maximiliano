import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "./CartItem";
import { CartEmpty } from "./CartEmpty";
import { useCartTotals } from "../hooks/useCartTotals";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { Trash2, ArrowLeft, Ticket } from "lucide-react";
import { db } from "../fireBase/config";
import { collection, getDocs, query, where } from "firebase/firestore";

export const Cart = () => {
  const { cart, emptyCart } = useContext(CartContext);
  const { user } = useAuth();
  const totalBase = useCartTotals(cart);
  const navigate = useNavigate();

  const [inputCupón, setInputCupón] = useState("");
  const [descuento, setDescuento] = useState(0);
  const [cupónAplicado, setCupónAplicado] = useState("");

  const handleValidarCupón = async () => {
    if (!inputCupón.trim()) return;
    
    if (!user) {
      toast.error("Iniciá sesión para validar las restricciones del cupón");
      return;
    }

    try {
      const q = query(collection(db, "cupones"), where("codigo", "==", inputCupón.trim().toUpperCase()));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        toast.error("El cupón ingresado no existe");
        return;
      }

      const couponId = querySnapshot.docs[0].id;
      const couponData = querySnapshot.docs[0].data();

      if (couponData.fechaExpiracion) {
        const hoy = new Date().toISOString().split('T')[0];
        if (hoy > couponData.fechaExpiracion) {
          toast.error("Este cupón ya expiró");
          return;
        }
      }

      if (couponData.limiteUsos !== null && (couponData.usosActuales >= couponData.limiteUsos)) {
        toast.error("Este cupón alcanzó su límite de usos disponibles");
        return;
      }

      const qOrders = query(collection(db, "orders"), where("uid", "==", user.uid));
      const ordersSnapshot = await getDocs(qOrders);
      
      const yaLoUso = ordersSnapshot.docs.some(doc => doc.data().cuponAplicadoId === couponId);
      if (yaLoUso) {
        toast.error("Ya utilizaste este cupón en una compra anterior");
        return;
      }

      setDescuento(couponData.porcentaje);
      setCupónAplicado(couponData.codigo);
      localStorage.setItem("active_coupon_id", couponId);
      toast.success(`Cupón ${couponData.codigo} aplicado: ${couponData.porcentaje}% de descuento`);
      
    } catch (error) {
      console.error(error);
      toast.error("Error al procesar la validación");
    }
  };

  const totalFinal = totalBase - (totalBase * (descuento / 100));

  const HandleEmptyCart = () => {
    emptyCart();
    localStorage.removeItem("active_coupon_id");
    toast('El carrito se vació correctamente', {
      duration: 3000,
      style: {
        borderRadius: '16px',
        padding: '12px 16px',
        background: '#0f172a',
        color: '#ffffff',
        border: 'none'
      }
    });
  };

  if (cart.length === 0) {
    return <CartEmpty />;
  }

  return (
    <main className="min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-md shadow-slate-100/80 border border-slate-100 overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-slate-100 flex justify-between items-center bg-white">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Tu Carrito <span className="text-slate-400 font-medium text-lg">({cart.length})</span>
            </h2>
            <button
              onClick={HandleEmptyCart}
              className="text-rose-500 hover:text-rose-600 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1"
            >
              <Trash2 size={14} />
              <span>Vaciar</span>
            </button>
          </div>

          <div className="p-4 sm:p-6 space-y-4">
            {cart.map((prod) => (
              <CartItem
                key={prod.id}
                item={{
                  id: prod.id,
                  titulo: prod.titulo,
                  precio: prod.precio,
                  cantidad: prod.cantidad,
                  imagenUrl: prod.imagenUrl,
                  stock: prod.stock
                }}
              />
            ))}
          </div>

          <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Ticket size={18} className="text-slate-400 shrink-0" />
              <input 
                type="text" 
                placeholder="¿TENÉS UN CUPÓN?" 
                value={inputCupón}
                onChange={(e) => setInputCupón(e.target.value)}
                disabled={!!cupónAplicado}
                className="bg-white border rounded-xl px-4 py-2.5 text-xs font-black uppercase outline-none focus:border-indigo-500/30 tracking-wider text-slate-800 w-full sm:w-48 disabled:opacity-60"
              />
              <button
                onClick={handleValidarCupón}
                disabled={!!cupónAplicado}
                className="bg-slate-900 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all disabled:opacity-50"
              >
                Aplicar
              </button>
            </div>
            {cupónAplicado && (
              <span className="text-[10px] font-black uppercase bg-emerald-50 border border-emerald-100 text-emerald-600 px-3 py-1.5 rounded-xl tracking-widest">
                Activo: {cupónAplicado} (-{descuento}%)
              </span>
            )}
          </div>

          <CartTotalBlock total={totalFinal} />
        </div>

        <button 
          onClick={() => navigate("/")}
          className="mt-6 flex items-center justify-center gap-2 text-slate-400 hover:text-slate-800 text-sm font-bold transition-colors w-full"
        >
          <ArrowLeft size={16} />
          <span>Continuar comprando</span>
        </button>
      </div>
    </main>
  );
};

export const CartTotalBlock = ({ total }) => {
  const navigate = useNavigate();

  return (
    <div className="p-6 sm:p-8 bg-slate-950 text-white">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center sm:items-start">
          <span className="text-slate-400 text-[10px] uppercase font-black tracking-widest">Total a pagar</span>
          <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            ${total.toFixed(2)}
          </span>
        </div>

        <button
          onClick={() => navigate("/form", { state: { totalFinalizado: total } })}
          className="w-full sm:w-auto bg-white hover:bg-slate-100 text-slate-950 font-black py-4 px-10 rounded-xl transition-all active:scale-[0.98] text-base flex items-center justify-center gap-2 shadow-lg shadow-black/10"
        >
          <span>Finalizar Compra</span>
          <svg xmlns="http://www.w3.org/2000/xl" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};
