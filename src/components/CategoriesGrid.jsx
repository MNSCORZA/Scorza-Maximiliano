import React, { useEffect, useState } from 'react';
import { getCategories } from '../fireBase/dataBase';
import { categoryStyleMap } from '../constants/categoryStyles';
import { CategoryCard } from './CategoryCard';

export const CategoriesGrid = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const getImageForCategory = (catName) => {
    const clean = catName
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

    const key = Object.keys(categoryStyleMap).find(k => clean.includes(k));
    return key ? categoryStyleMap[key] : categoryStyleMap.default;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="h-6 w-48 bg-gray-200 animate-pulse rounded mb-8"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-40 bg-gray-100 animate-pulse rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (categories.length === 0) return null;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-xl font-extrabold text-gray-900 uppercase tracking-tight mb-8">
          Buscar por <span className="text-blue-600">Categoría</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((catName) => (
            <CategoryCard
              key={catName}
              title={catName}
              image={getImageForCategory(catName)}
              route={`/Catalogo?category=${encodeURIComponent(catName)}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
