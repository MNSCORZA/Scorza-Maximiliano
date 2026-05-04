import { 
  collection, 
  getDocs, 
  getFirestore, 
  query, 
  where, 
  getDoc, 
  doc, 
  serverTimestamp,
  writeBatch
} from "firebase/firestore";
import { app } from "./config.js";

const db = getFirestore(app);

export const getItems = async () => {
  const querySnapshot = await getDocs(collection(db, 'productos'));
  const items = [];
  querySnapshot.forEach((doc) => {
    items.push({ ...doc.data(), id: doc.id });
  });
  return items;
};

export const getItemsByCategory = async (categoria) => {
  const q = query(
    collection(db, "productos"),
    where('categoria', '==', categoria)
  );
  const querySnapshot = await getDocs(q);
  const items = [];
  querySnapshot.forEach((doc) => {
    items.push({ ...doc.data(), id: doc.id });
  });
  return items;
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
  
  const orderItems = items.map((item) => ({
    id: item.id,
    titulo: item.titulo,
    precio: item.precio,
    cantidad: item.cantidad,
  }));

  const order = {
    buyer: buyerData,
    items: orderItems,
    total: total,
    date: serverTimestamp(),
  };

  const newOrderRef = doc(ordersCollection);
  batch.set(newOrderRef, order);

  items.forEach((item) => {
    const productRef = doc(db, "productos", item.id);
    batch.update(productRef, {
      stock: item.stock - item.cantidad
    });
  });

  await batch.commit();
  return newOrderRef.id;
};