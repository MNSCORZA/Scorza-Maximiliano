import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../fireBase/config';
import { getOrdersByUserId } from '../fireBase/dataBase';
import { doc, updateDoc } from 'firebase/firestore';
import { User } from 'lucide-react';
import { toast } from 'sonner';
import UserAddressForm from '../components/user/UserAddressForm';
import UserOrdersHistory from '../components/user/UserOrdersHistory';

const UserPanel = () => {
  const { userData, user } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(true);
  
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
      setLoadingOrders(false);
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
          <UserAddressForm 
            formData={formData}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            handleChange={handleChange}
            handleUpdate={handleUpdate}
          />
          
          <UserOrdersHistory 
            pedidos={pedidos}
            loading={loadingOrders}
          />
        </div>

      </div>
    </div>
  );
};

export default UserPanel;
