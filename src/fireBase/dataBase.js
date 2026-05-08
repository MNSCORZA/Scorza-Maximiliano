import { 
  collection, 
  getDocs, 
  getFirestore, 
  query, 
  where, 
  getDoc, 
  doc, 
  serverTimestamp,
  writeBatch,
  increment
} from "firebase/firestore";
import { db } from "./config.js";

export const getItems = async () => {
  const querySnapshot = await getDocs(collection(db, 'productos'));
  return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

export const getItemsByCategory = async (categoria) => {
  const q = query(collection(db, "productos"), where('categoria', '==', categoria));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

export const getCategories = async () => {
  const querySnapshot = await getDocs(collection(db, "productos"));
  const categories = new Set();
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data?.categoria) categories.add(data.categoria);
  });
  return Array.from(categories);
};

export const getItemId = async (id) => {
  const docRef = doc(db, "productos", id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { ...docSnap.data(), id: docSnap.id } : null;
};

export const createOrder = async (buyerData, items, total) => {
  const batch = writeBatch(db);
  const ordersCollection = collection(db, "orders");
  const newOrderRef = doc(ordersCollection);

  const order = {
    buyer: buyerData,
    items: items.map(item => ({
      id: item.id,
      titulo: item.titulo,
      precio: item.precio,
      cantidad: item.cantidad
    })),
    total: total,
    date: serverTimestamp(),
  };

  batch.set(newOrderRef, order);

  items.forEach((item) => {
    const productRef = doc(db, "productos", item.id);
    batch.update(productRef, {
      stock: increment(-item.cantidad)
    });
  });

  await batch.commit();
  return newOrderRef.id;
};
