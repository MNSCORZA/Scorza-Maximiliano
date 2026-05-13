import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router";
import { Mail, ArrowLeft, Send, CheckCircle2 } from "lucide-react";

export const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
    } catch (err) {
      setError("Error al enviar el correo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 border border-slate-100">
        <div className="text-center mb-8">
          <Link to="/login" className="inline-flex items-center gap-2 text-slate-400 text-xs font-bold uppercase mb-6 text-decoration-none">
            <ArrowLeft size={14} /> Volver
          </Link>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">{sent ? "¡Enviado!" : "Recuperar Clave"}</h2>
        </div>
        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="email" placeholder="ejemplo@correo.com" className="w-full bg-slate-50 rounded-2xl py-4 px-4 text-sm font-bold outline-none border-2 border-transparent focus:border-indigo-600/20" onChange={e => setEmail(e.target.value)} required />
            <button disabled={loading} className="w-full bg-slate-900 text-white font-black uppercase text-[11px] py-5 rounded-2xl">
              {loading ? "Enviando..." : "Enviar Instrucciones"}
            </button>
          </form>
        ) : (
          <Link to="/login" className="w-full bg-slate-900 text-white font-black uppercase text-[11px] py-5 rounded-2xl flex justify-center text-decoration-none">Volver al Login</Link>
        )}
      </div>
    </div>
  );
};
