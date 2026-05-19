import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../fireBase/config';
import { getOrdersByUserId } from '../fireBase/dataBase';
import { doc, updateDoc } from 'firebase/firestore';
import { User, MapPin, Package } from 'lucide-react';
import { toast } from 'sonner';
import UserAddressForm from '../components/user/UserAddressForm';
import UserOrdersHistory from '../components/user/UserOrdersHistory';

const UserPanel = () => {
  const { userData, user } = useAuth();
  const [activeTab, setActiveTab] = useState('datos'); // 'datos' o 'compras'
  const [pedidos, setPedidos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(true);
  
  const [formData, setFormData] = useState({
    dni: "",
    codArea: "",
    telefono: "",
    provincia: "",
    localidad: "",
    direccion: "",
    depto: "",
    cp: "",
    entreCalles: "",
    notas: ""
  });

  useEffect(() => {
    const fetchPedidos = async () => {
      if (user?.uid) {
        const data = await getOrdersByUserId(user.uid);
        setPedidos(data);
      }
      setLoadingOrders(false);
    };
    fetchPedidos();
  }, [user]);

  useEffect(() => {
    if (userData) {
      setFormData({
        dni: userData.dni || "",
        codArea: userData.codArea || "",
        telefono: userData.telefono || "",
        provincia: userData.provincia || "",
        localidad: userData.localidad || "",
        direccion: userData.direccion || "",
        depto: userData.depto || "",
        cp: userData.cp || "",
        entreCalles: userData.entreCalles || "",
        notas: userData.notas || ""
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
      toast.success("Perfil de envío actualizado de forma segura");
      setIsEditing(false);
    } catch (error) {
      toast.error("Error al guardar los cambios");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm flex items-center gap-5 border border-slate-100">
          <div className="bg-indigo-600 w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
            <User size={26} />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">{userData?.nombre}</h1>
            <p className="text-slate-400 font-medium text-xs">{userData?.email}</p>
          </div>
        </div>

        <div className="bg-white p-2 rounded-2xl border border-slate-100 shadow-sm grid grid-cols-2 gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('datos')}
            className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
              activeTab === 'datos' 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' 
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            <MapPin size={14} /> Mis Datos
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('compras')}
            className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
              activeTab === 'compras' 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' 
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Package size={14} /> Mis Compras
          </button>
        </div>

        <div className="transition-all duration-200">
          {activeTab === 'datos' ? (
            <UserAddressForm 
              formData={formData}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              handleChange={handleChange}
              handleUpdate={handleUpdate}
            />
          ) : (
            <UserOrdersHistory 
              pedidos={pedidos}
              loading={loadingOrders}
            />
          )}
        </div>

      </div>
    </div>
  );
};

export default UserPanel;
