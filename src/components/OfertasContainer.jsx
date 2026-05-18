import React, { useState, useEffect } from 'react';
import { db } from '../fireBase/config';
import { collection, getDocs } from 'firebase/firestore';
import { Item } from './Item';
import { Percent } from 'lucide-react';

export const OfertasContainer = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllOffers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'productos'));
        const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const filteredOffers = list.filter(item => item.precioAnterior && Number(item.precioAnterior) > Number(item.precio));
        setOffers(filteredOffers);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllOffers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12 pt-6">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-6 mb-8">
          <div className="bg-orange-500 text-white p-2 rounded-xl">
            <Percent size={20} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 uppercase">
              Todas las Ofertas
            </h1>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-0.5">
              Encontrá las mejores rebajas disponibles en el catálogo
            </p>
          </div>
        </div>

        {offers.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 font-medium">No hay ofertas disponibles en este momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {offers.map((product, idx) => (
              <Item key={product.id} item={product} index={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
