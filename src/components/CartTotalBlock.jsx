import { useNavigate } from "react-router";

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
          onClick={() => navigate("/form")}
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
