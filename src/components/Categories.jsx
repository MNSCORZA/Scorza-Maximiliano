import React, { useEffect, useState } from 'react';
import {db} from '../fireBase/dataBase';  
import { collection, getDocs } from 'firebase/firestore';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "categorias"));
        setCategories(querySnapshot.docs.map(doc => doc.data().nombre));
      } catch (e) { console.error(e); }
    };
    getCats();
  }, []);

  return (
    <section className="py-12 container mx-auto px-6">
      <h2 className="text-xl font-bold mb-8 text-gray-800 border-l-4 border-blue-600 pl-3 uppercase tracking-tighter">
        Explorar Rubros
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div key={cat} className="group cursor-pointer text-center">
            <div className="aspect-square bg-gray-100 rounded-full flex items-center justify-center border-2 border-transparent group-hover:border-blue-600 transition-all mb-3 overflow-hidden">
              <div className="bg-gray-200 w-full h-full group-hover:scale-110 transition-transform duration-500 flex items-center justify-center text-gray-400 font-bold uppercase text-2xl">
                {cat.charAt(0)}
              </div>
            </div>
            <span className="font-bold text-sm text-gray-700 group-hover:text-blue-600 uppercase transition-colors">{cat}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;