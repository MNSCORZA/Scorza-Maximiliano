import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router";
import { LogIn, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, pass);
      toast.success("¡Bienvenido!");
      navigate("/");
    } catch (err) {
      toast.error("Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 p-10 border border-slate-100">
        
        <div className="text-center mb-8">
          <div className="bg-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-200 -rotate-3 transition-transform duration-300">
            <LogIn className="text-white" size={32} strokeWidth={2.5} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Ingresar</h2>
          <p className="text-slate-400 text-sm font-medium mt-2">Gestioná tu cuenta en "De Todo"</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={20} />
              <input 
                type="email" 
                placeholder="nombre@detodo.com" 
                className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-slate-700 outline-none focus:bg-white focus:border-indigo-600/20 transition-all shadow-inner" 
                onChange={e => setEmail(e.target.value)} 
                required 
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Contraseña</label>
              <Link to="/reset-password" name="reset" className="text-[10px] font-black uppercase text-indigo-600 hover:underline font-bold decoration-none">¿La olvidaste?</Link>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={20} />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-12 text-sm font-bold text-slate-700 outline-none focus:bg-white focus:border-indigo-600/20 transition-all shadow-inner" 
                onChange={e => setPass(e.target.value)} 
                required 
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-[11px] py-5 rounded-2xl hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 group mt-4 disabled:bg-slate-400"
          >
            {loading ? "Entrando..." : "Entrar al Panel"}
            {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-slate-100 pt-6">
            <p className="text-xs text-slate-500 font-medium">
                ¿No tenés cuenta? <Link to="/signup" className="text-indigo-600 font-bold hover:underline decoration-none ml-1">Registrate acá</Link>
            </p>
        </div>
      </div>
    </div>
  );
};
