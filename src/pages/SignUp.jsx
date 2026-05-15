import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router";
import { UserPlus, Mail, Lock, User, Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (pass !== confirmPass) return setError("Las contraseñas no coinciden");
    setLoading(true);
    try {
      await register(email, pass, { nombre, apellido });
      navigate("/");
    } catch (err) {
      setError("Error al crear la cuenta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 p-10 border border-slate-100">
        <div className="text-center mb-8">
          <Link to="/login" className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 text-xs font-bold uppercase tracking-widest mb-6 transition-colors text-decoration-none">
            <ArrowLeft size={14} /> Volver al ingreso
          </Link>
          <div className="bg-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-200 -rotate-3">
            <UserPlus className="text-white" size={32} strokeWidth={2.5} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Crear Cuenta</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="bg-red-50 text-red-600 text-[11px] font-black uppercase p-4 rounded-2xl text-center">{error}</div>}
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Nombre" className="w-full bg-slate-50 rounded-2xl py-4 px-4 text-sm font-bold text-slate-700 outline-none border-2 border-transparent focus:border-indigo-600/20" onChange={e => setNombre(e.target.value)} required />
            <input type="text" placeholder="Apellido" className="w-full bg-slate-50 rounded-2xl py-4 px-4 text-sm font-bold text-slate-700 outline-none border-2 border-transparent focus:border-indigo-600/20" onChange={e => setApellido(e.target.value)} required />
          </div>
          <input type="email" placeholder="Email" className="w-full bg-slate-50 rounded-2xl py-4 px-4 text-sm font-bold text-slate-700 outline-none border-2 border-transparent focus:border-indigo-600/20" onChange={e => setEmail(e.target.value)} required />
          <div className="relative">
            <input type={showPassword ? "text" : "password"} placeholder="Contraseña" className="w-full bg-slate-50 rounded-2xl py-4 px-4 text-sm font-bold text-slate-700 outline-none border-2 border-transparent focus:border-indigo-600/20" onChange={e => setPass(e.target.value)} required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <input type="password" placeholder="Confirmar Contraseña" className="w-full bg-slate-50 rounded-2xl py-4 px-4 text-sm font-bold text-slate-700 outline-none border-2 border-transparent focus:border-indigo-600/20" onChange={e => setConfirmPass(e.target.value)} required />
          <button disabled={loading} className="w-full bg-slate-900 text-white font-black uppercase text-[11px] py-5 rounded-2xl hover:bg-indigo-600 disabled:bg-slate-400 transition-colors shadow-lg shadow-slate-200">
            {loading ? "Creando cuenta..." : "Registrarme"}
          </button>
        </form>
      </div>
    </div>
  );
};
