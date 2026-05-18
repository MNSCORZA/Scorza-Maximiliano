import React, { useState, useEffect } from 'react';
import { Item } from './Item';
import { Eye } from 'lucide-react';

export const HistoryGrid = () => {
  const [recentItems, setRecentItems] = useState([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('recent_views')) || [];
    setRecentItems(history);
  }, []);

  if (recentItems.length === 0) return null;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 my-10">
      <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
        <div className="bg-blue-600 text-white p-1.5 rounded-lg">
          <Eye size={16} />
        </div>
        <div>
          <h2 className="text-md sm:text-lg font-black text-gray-900 uppercase tracking-tight">Inspirado en lo último que viste</h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Productos basados en tu navegación reciente</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recentItems.map((item, idx) => (
          <Item key={`history-${item.id}`} item={item} index={idx} />
        ))}
      </div>
    </section>
  );
};
