import React from 'react';
import { Edit3, Trash2, ArrowUpDown, PackageX } from 'lucide-react';

const ProductTable = ({ products, onEdit, onDelete, onSort }) => (
  <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
    <table className="w-full text-left">
      <thead className="bg-gray-50/50 text-[10px] font-black uppercase text-gray-400">
        <tr>
          <th className="p-6 cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => onSort('titulo')}>
            <div className="flex items-center gap-2">Producto <ArrowUpDown size={12}/></div>
          </th>
          <th className="p-6 hidden md:table-cell cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => onSort('stock')}>
            <div className="flex items-center gap-2">Disponibilidad <ArrowUpDown size={12}/></div>
          </th>
          <th className="p-6 text-center">Acciones</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-50">
        {products.map(p => (
          <tr key={p.id} className="hover:bg-gray-50/30 transition-colors">
            <td className="p-6 flex items-center gap-4">
              <div className="relative">
                <img src={p.imagenUrl} className="w-16 h-16 rounded-2xl object-cover bg-gray-50 border border-gray-100" alt="" />
                {Number(p.stock) <= 0 && <div className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-lg shadow-lg"><PackageX size={12}/></div>}
              </div>
              <div>
                <p className="font-bold text-gray-900 leading-tight mb-1">{p.titulo}</p>
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{p.categoria}</p>
              </div>
            </td>
            <td className="p-6 hidden md:table-cell">
              <p className="text-sm text-indigo-600 font-black">${p.precio}</p>
              <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md w-fit mt-1 block ${Number(p.stock) <= 0 ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
                {p.stock} unidades
              </span>
            </td>
            <td className="p-6">
              <div className="flex justify-center gap-3">
                <button onClick={() => onEdit(p)} className="p-3 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all"><Edit3 size={18}/></button>
                <button onClick={() => onDelete(p.id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"><Trash2 size={18}/></button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ProductTable;
