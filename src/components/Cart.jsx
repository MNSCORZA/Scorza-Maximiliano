import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "./CartItem";
import { CartEmpty } from "./CartEmpty";
import { useCartTotals } from "../hooks/useCartTotals";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { Trash2, ArrowLeft } from "lucide-react";
import { db } from "../fireBase/config";
import { collection, getDocs, query, where } from "firebase/firestore";

import { CartShippingProgressBar } from "./CartShippingProgressBar";
import { CartCouponInput } from "./CartCouponInput";
import { CartTotalBlock } from "./CartTotalBlock";

export const Cart = () => {
  const { cart, emptyCart } = useContext(CartContext);
  const { user } = useAuth();
  const { base: totalBase, descuentoAutomatico, total: totalConReglas, envioGratis, montoMinimoEnvio } = useCartTotals(cart);
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

      // 🔐 VALIDACIÓN CRÍTICA: Verificar exclusividad por ID de usuario
      if (couponData.userId && couponData.userId !== user.uid) {
        toast.error("Este cupón es exclusivo para otra cuenta y no podés utilizarlo acá");
        return;
      }

      if (couponData.montoMinimo && totalConReglas < couponData.montoMinimo) {
        toast.error(`Monto insuficiente. Este cupón requiere una compra mínima de $${couponData.montoMinimo.toLocaleString('es-AR')}`);
        return;
      }

      if (couponData.fechaExpiracion) {
        const hoy = new Date().toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" });
        const [fechaHoy] = hoy.split(" ");
        const [dia, mes, anio] = fechaHoy.replace(",", "").split("/");
        const hoyFormateado = `${anio}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;

        if (hoyFormateado > couponData.fechaExpiracion) {
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
      localStorage.setItem("active_coupon_pct", String(couponData.porcentaje));
      localStorage.setItem("active_coupon_min", String(couponData.montoMinimo || 0));

      toast.success(`Cupón ${couponData.codigo} aplicado: ${couponData.porcentaje}% de descuento`);

    } catch (error) {
      console.error(error);
      toast.error("Error al procesar la validación");
    }
  };

  const totalFinal = totalConReglas - (totalConReglas * (descuento / 100));

  const HandleEmptyCart = () => {
    emptyCart();
    localStorage.removeItem("active_coupon_id");
    localStorage.removeItem("active_coupon_pct");
    localStorage.removeItem("active_coupon_min");
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

          {descuentoAutomatico > 0 && (
            <div className="mx-6 mb-2 p-3 bg-indigo-50 border border-indigo-100 rounded-2xl flex justify-between items-center text-xs text-indigo-700 font-black uppercase tracking-wide">
              <span>Regla de carrito aplicada automáticamente:</span>
              <span>-${descuentoAutomatico.toFixed(2)}</span>
            </div>
          )}

          <CartShippingProgressBar 
            envioGratis={envioGratis}
            totalConReglas={totalConReglas}
            montoMinimoEnvio={montoMinimoEnvio}
          />

          <CartCouponInput 
            inputCupón={inputCupón}
            setInputCupón={setInputCupón}
            cupónAplicado={cupónAplicado}
            descuento={descuento}
            handleValidarCupón={handleValidarCupón}
          />

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
