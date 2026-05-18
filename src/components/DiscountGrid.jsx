import React, { useState, useEffect } from 'react';
import { db } from '../fireBase/config';
import { collection, getDocs } from 'firebase/firestore';
import { Item } from './Item';
import { useNavigate } from 'react-router';
import { Percent } from 'lucide-react';

export const DiscountGrid = () => {
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'productos'));
        const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const filteredOffers = list.filter(item => item.precioAnterior && Number(item.precioAnterior) > Number(item.precio));
        setOffers(filteredOffers.slice(0, 4));
      } catch (error) {
        console.error(error);
      }
    };
    fetchOffers();
  }, []);

  if (offers.length === 0) return null;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 my-10">
      <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2">
          <div className="bg-orange-500 text-white p-1.5 rounded-lg">
            <Percent size={16} className="animate-pulse" />
          </div>
          <div>
            <h2 className="text-md sm:text-lg font-black text-gray-900 uppercase tracking-tight">Súper Ofertas</h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Descuentos brutales por tiempo limitado</p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/ofertas')}
          className="text-[10px] font-black text-blue-600 border border-blue-100 bg-blue-50/50 hover:bg-blue-50 px-3 py-2 rounded-xl uppercase tracking-wider transition-colors cursor-pointer"
        >
          Ver todas →
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {offers.map((item, idx) => (
          <Item key={item.id} item={item} index={idx} />
        ))}
      </div>
    </section>
  );
};
