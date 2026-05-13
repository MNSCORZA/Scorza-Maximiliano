import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../fireBase/config';
import { getOrdersByUserId } from '../fireBase/dataBase';
import { doc, updateDoc } from 'firebase/firestore';
import { User, MapPin, Phone, Package, Save } from 'lucide-react';
import { toast } from 'sonner';

const UserPanel = () => {
    const { userData, user } = useAuth();
    const [pedidos, setPedidos] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        telefono: userData?.telefono || "",
        direccion: userData?.direccion || ""
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

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const userRef = doc(db, "usuarios", user.uid);
            await updateDoc(userRef, formData);
            toast.success("Datos guardados");
            setIsEditing(false);
        } catch (error) {
            toast.error("Error al guardar");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="bg-white p-8 rounded-[2rem] shadow-sm flex items-center gap-6">
                    <div className="bg-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white"><User size={30} /></div>
                    <div><h1 className="text-2xl font-black text-slate-900">{userData?.nombre}</h1><p className="text-slate-400">{userData?.email}</p></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-[2rem] shadow-sm">
                        <h3 className="font-black text-xs uppercase mb-4 flex items-center gap-2"><MapPin size={16}/> Mis Datos</h3>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <input disabled={!isEditing} value={formData.telefono} onChange={e => setFormData({...formData, telefono: e.target.value})} className="w-full bg-slate-50 rounded-xl py-2 px-3 text-sm font-bold" placeholder="Teléfono" />
                            <input disabled={!isEditing} value={formData.direccion} onChange={e => setFormData({...formData, direccion: e.target.value})} className="w-full bg-slate-50 rounded-xl py-2 px-3 text-sm font-bold" placeholder="Dirección" />
                            {isEditing ? <button className="w-full bg-indigo-600 text-white py-2 rounded-xl text-xs font-black uppercase">Guardar</button> : <button type="button" onClick={() => setIsEditing(true)} className="w-full bg-slate-100 text-slate-600 py-2 rounded-xl text-xs font-black uppercase">Editar</button>}
                        </form>
                    </div>
                    <div className="md:col-span-2 bg-white p-6 rounded-[2rem] shadow-sm">
                        <h3 className="font-black text-xs uppercase mb-4 flex items-center gap-2"><Package size={16}/> Historial</h3>
                        <div className="space-y-3">
                            {pedidos.map(p => (
                                <div key={p.id} className="border border-slate-50 p-4 rounded-xl flex justify-between items-center">
                                    <div><p className="font-black text-slate-800 text-sm">#{p.id.slice(-6).toUpperCase()}</p><p className="text-[10px] text-slate-400 font-bold uppercase">{p.status}</p></div>
                                    <p className="font-black text-slate-700 text-sm">$ {p.total}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPanel;
