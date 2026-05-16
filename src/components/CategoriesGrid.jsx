import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getCategories } from '../fireBase/dataBase';
import { LayoutGrid, ShoppingBag, Wrench, Laptop, Home } from 'lucide-react';

const categoryStyleMap = {
  bazar: {
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&auto=format&fit=crop&q=60',
    icon: <Home className="text-white" size={20} />
  },
  electronica: {
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&auto=format&fit=crop&q=60',
    icon: <Laptop className="text-white" size={20} />
  },
  herramientas: {
    image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=500&auto=format&fit=crop&q=60',
    icon: <Wrench className="text-white" size={20} />
  },
  indumentaria: {
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&auto=format&fit=crop&q=60',
    icon: <ShoppingBag className="text-white" size={20} />
  },
  default: {
    image: 'https://images.unsplash.com/photo-1522204538344-922f76ecc041?w=500&auto=format&fit=crop&q=60',
    icon: <LayoutGrid className="text-white" size={20} />
  }
};

export const CategoriesGrid = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleCategoryClick = (catName) => {
    const cleanName = catName.toLowerCase().trim();
    navigate(`/Catalogo?categoria=${cleanName}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="h-6 w-48 bg-gray-200 animate-pulse rounded mb-8"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
          {categories.map((catName) => {
            const normalizedKey = catName.toLowerCase().trim();
            const styles = categoryStyleMap[normalizedKey] || categoryStyleMap.default;

            return (
              <div 
                key={catName} 
                onClick={() => handleCategoryClick(catName)}
                className="group relative h-40 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <img 
                  src={styles.image} 
                  alt={catName} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-900/40 to-transparent"></div>
                
                <div className="absolute inset-0 p-4 flex flex-col justify-between items-start">
                  <div className="p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 group-hover:bg-blue-600 transition-colors duration-300">
                    {styles.icon}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wide group-hover:text-blue-400 transition-colors">
                      {catName}
                    </h3>
                    <span className="text-[10px] text-gray-300 font-medium block mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Ver productos →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
