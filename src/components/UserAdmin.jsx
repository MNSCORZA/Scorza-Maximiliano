import React, { useEffect, useState } from 'react';
import { db } from '../fireBase/config';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { UserPlus, Save, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export const UserAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "usuarios"));
    const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUsers(docs);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRol) => {
    try {
      const userRef = doc(db, "usuarios", userId);
      await updateDoc(userRef, { rol: newRol });
      toast.success("Permisos actualizados correctamente");
      fetchUsers();
    } catch (error) {
      toast.error("Error al actualizar permisos");
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 p-3 rounded-2xl text-indigo-600">
            <ShieldCheck size={24} />
          </div>
          <h2 className="text-2xl font-black text-gray-900">Gestión de Empleados</h2>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] font-black uppercase tracking-widest text-gray-400 border-b">
              <th className="pb-4 px-2">Usuario</th>
              <th className="pb-4 px-2">Email</th>
              <th className="pb-4 px-2">Rol / Permisos</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((u) => (
              <tr key={u.id} className="group hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-2">
                  <span className="font-bold text-gray-900">{u.nombre}</span>
                </td>
                <td className="py-4 px-2 text-sm text-gray-500">{u.email}</td>
                <td className="py-4 px-2">
                  <select 
                    value={u.rol} 
                    onChange={(e) => handleRoleChange(u.id, e.target.value)}
                    className="bg-gray-100 border-none rounded-xl text-xs font-bold p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="cliente">Cliente</option>
                    <option value="empleado">Empleado (Ventas)</option>
                    <option value="admin">Administrador Total</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};