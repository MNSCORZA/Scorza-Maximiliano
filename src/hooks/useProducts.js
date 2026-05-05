import { useState, useEffect } from 'react';
import { db } from '../fireBase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const useProducts = (categoryId = null, searchQuery = "") => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let q = collection(db, "productos");
        
        if (categoryId) {
          q = query(q, where("categoria", "==", categoryId));
        }

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (searchQuery) {
          const filtered = data.filter(p => 
            p.titulo.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setProducts(filtered);
        } else {
          setProducts(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, searchQuery]);

  return { products, loading };
};