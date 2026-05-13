import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { LogIn, Mail, Lock } from "lucide-react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, pass);
      navigate("/admin");
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
        <div className="text-center mb-10">
          <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LogIn className="text-indigo-600" size={32} />
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Acceso Administrador</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="bg-red-50 text-red-600 text-xs font-bold p-4 rounded-xl">{error}</div>}
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="email" placeholder="Email" className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:bg-white focus:border-indigo-600/20 transition-all" onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="password" placeholder="Contraseña" className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:bg-white focus:border-indigo-600/20 transition-all" onChange={e => setPass(e.target.value)} required />
          </div>
          <button className="w-full bg-gray-900 text-white font-black uppercase tracking-widest text-[11px] py-5 rounded-2xl hover:bg-indigo-600 transition-all">Entrar al Panel</button>
        </form>
      </div>
    </div>
  );
};