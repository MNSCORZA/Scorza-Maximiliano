import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router";
export const CartWidget = () => {
  const { getCantidad } = useContext(CartContext);
  const cantidad = getCantidad();
  const navigate = useNavigate();
  return (
    <section className="flex ">
      <p
        onClick={() => navigate("/cart")}
        className="m-2 font-bold text-2xl border-1 border-indigo-600 rounded-full p-2 hover:cursor-pointer hover:bg-indigo-700"
      >
        🛒 {cantidad == 0 ? "" : cantidad}
      </p>
    </section>
  );
};
