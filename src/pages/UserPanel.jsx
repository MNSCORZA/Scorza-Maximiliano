import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../fireBase/config';
import { getOrdersByUserId } from '../fireBase/dataBase';
import { doc, updateDoc } from 'firebase/firestore';
import { User, MapPin, Package, Save, Edit2, Hash, Navigation } from 'lucide-react';
import { toast } from 'sonner';

const InputField = ({ label, icon: Icon, name, placeholder, value, onChange, disabled, colSpan = "col-span-2" }) => (
    <div className={colSpan}>
        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2 mb-1 block">
            {label}
        </label>
        <div className="relative">
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
            <input 
                disabled={disabled}
                value={value}
                onChange={onChange}
                name={name}
                placeholder={placeholder}
                className="w-full bg-slate-50 border-2 border-transparent rounded-xl py-2.5 pl-9 pr-3 text-sm font-bold text-slate-700 outline-none focus:bg-white focus:border-indigo-600/20 transition-all disabled:opacity-60"
            />
        </div>
    </div>
);

const UserPanel = () => {
    const { userData, user } = useAuth();
    const [pedidos, setPedidos] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        codArea: "",
        telefono: "",
        direccion: "",
        depto: "",
        cp: "",
        entreCalles: ""
    });

    useEffect(() => {
        const fetchPedidos = async () => {
            if (user?.uid) {
                const data = await getOrdersByUserId(user.uid);
                setPedidos(data);
            }
            setLoading(false);
        };
        fetchPedidos();
    }, [user]);

    useEffect(() => {
        if (userData) {
            setFormData({
                codArea: userData.codArea || "",
                telefono: userData.telefono || "",
                direccion: userData.direccion || "",
                depto: userData.depto || "",
                cp: userData.cp || "",
                entreCalles: userData.entreCalles || ""
            });
        }
    }, [userData]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const userRef = doc(db, "usuarios", user.uid);
            await updateDoc(userRef, formData);
            toast.success("Datos de envío actualizados");
            setIsEditing(false);
        } catch (error) {
            toast.error("Error al guardar los cambios");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm flex items-center gap-6 border border-slate-100">
                    <div className="bg-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                        <User size={30} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">{userData?.nombre}</h1>
                        <p className="text-slate-400 font-medium">{userData?.email}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 h-fit">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-black text-xs uppercase tracking-widest flex items-center gap-2 text-slate-900">
                                <MapPin size={16} className="text-indigo-600"/> Mis Datos
                            </h3>
                            {!isEditing && (
                                <button onClick={() => setIsEditing(true)} className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-lg transition-colors">
                                    <Edit2 size={16} />
                                </button>
                            )}
                        </div>

                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <InputField label="Cód. Área" icon={Hash} name="codArea" placeholder="011" value={formData.codArea} onChange={handleChange} disabled={!isEditing} colSpan="col-span-1" />
                                <InputField label="Teléfono" icon={Hash} name="telefono" placeholder="1234-5678" value={formData.telefono} onChange={handleChange} disabled={!isEditing} colSpan="col-span-1" />
                            </div>
                            
                            <InputField label="Dirección" icon={MapPin} name="direccion" placeholder="Calle y Altura" value={formData.direccion} onChange={handleChange} disabled={!isEditing} colSpan="col-span-2" />
                            
                            <div className="grid grid-cols-2 gap-3">
                                <InputField label="Piso/Depto" icon={Navigation} name="depto" placeholder="2° B" value={formData.depto} onChange={handleChange} disabled={!isEditing} colSpan="col-span-1" />
                                <InputField label="CP" icon={Hash} name="cp" placeholder="1425" value={formData.cp} onChange={handleChange} disabled={!isEditing} colSpan="col-span-1" />
                            </div>

                            <InputField label="Entre Calles" icon={Navigation} name="entreCalles" placeholder="Tucumán y Lavalle" value={formData.entreCalles} onChange={handleChange} disabled={!isEditing} colSpan="col-span-2" />

                            {isEditing && (
                                <div className="flex gap-2 pt-2">
                                    <button type="submit" className="flex-1 bg-slate-900 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all flex items-center justify-center gap-2">
                                        <Save size={14} /> Guardar
                                    </button>
                                    <button type="button" onClick={() => setIsEditing(false)} className="px-4 bg-slate-100 text-slate-500 py-3 rounded-xl text-[10px] font-black uppercase hover:bg-slate-200 transition-all">
                                        X
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>

                    <div className="md:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                        <h3 className="font-black text-xs uppercase tracking-widest mb-6 flex items-center gap-2 text-slate-900">
                            <Package size={16} className="text-indigo-600"/> Historial de Compras
                        </h3>
                        
                        <div className="space-y-4">
                            {pedidos.length > 0 ? (
                                pedidos.map(p => (
                                    <div key={p.id} className="group border border-slate-50 bg-slate-50/30 p-5 rounded-[1.5rem] flex justify-between items-center hover:bg-white hover:shadow-md hover:border-indigo-100 transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-white p-3 rounded-xl shadow-sm text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                                <Package size={20} />
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-800 text-sm tracking-tight">Orden #{p.id.slice(-6).toUpperCase()}</p>
                                                <p className="text-[10px] text-indigo-600 font-black uppercase tracking-tighter mt-0.5">{p.status}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-black text-slate-900 text-base">$ {p.total}</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Finalizado</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Package className="text-slate-200" size={32} />
                                    </div>
                                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Aún no realizaste pedidos</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPanel;
