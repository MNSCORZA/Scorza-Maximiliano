import { useState, useEffect, useMemo } from 'react';
import { db } from '../fireBase/config';
import { collection, getDocs } from 'firebase/firestore';
import * as ProductService from '../services/productService';

export const useAdmin = (user, userData, loading) => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('todas');
  const [onlyNoStock, setOnlyNoStock] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'titulo', direction: 'asc' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({ 
    titulo: '', descripcion: '', precio: '', stock: '', categoria: '', imagenUrl: '', envioGratis: false 
  });

  const refreshProducts = async () => {
    const data = await ProductService.getProducts();
    setProducts(data || []);
  };

  const refreshUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "usuarios"));
      setUsers(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    if (!loading && userData?.permisos) {
      refreshProducts();
      if (userData.permisos.isAdmin) refreshUsers();
    }
  }, [userData, loading]);

  const categories = useMemo(() => {
    const cats = products.map(p => p.categoria);
    return ['todas', ...new Set(cats)];
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter(p => {
      const matchesSearch = p.titulo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'todas' || p.categoria === categoryFilter;
      const matchesStock = onlyNoStock ? Number(p.stock) <= 0 : true;
      return matchesSearch && matchesCategory && matchesStock;
    });

    result.sort((a, b) => {
      const valA = (sortConfig.key === 'precio' || sortConfig.key === 'stock') ? Number(a[sortConfig.key]) : a[sortConfig.key];
      const valB = (sortConfig.key === 'precio' || sortConfig.key === 'stock') ? Number(b[sortConfig.key]) : b[sortConfig.key];
      if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return result;
  }, [products, searchTerm, categoryFilter, onlyNoStock, sortConfig]);

  return {
    products: filteredAndSortedProducts,
    users,
    categories,
    searchTerm, setSearchTerm,
    categoryFilter, setCategoryFilter,
    onlyNoStock, setOnlyNoStock,
    sortConfig, setSortConfig,
    formData, setFormData,
    isEditing, setIsEditing,
    currentId, setCurrentId,
    refreshProducts, refreshUsers
  };
};
