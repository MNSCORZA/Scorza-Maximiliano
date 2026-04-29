import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
  getDoc,
  doc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { app } from "./config.js";

const db = getFirestore(app);

export const getItems = async () => {
  const querySnapshot = await getDocs(collection(db, "productos"));
  const items = [];
  querySnapshot.forEach((doc) => {
    items.push({ ...doc.data(), id: doc.id });
  });
  return items;
};

export const getItemsByCategory = async (categoria) => {
  const q = query(
    collection(db, "productos"),
    where("categoria", "==", categoria)
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
    if (data && data.categoria) {
      categories.add(data.categoria);
    }
  });
  return Array.from(categories);
};

export const getItemId = async (id) => {
  const docRef = doc(db, "productos", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { ...docSnap.data(), id: docSnap.id };
  } else {
    return null;
  }
};

export const createOrder = async (buyerData, items, total) => {
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
  const docRef = await addDoc(collection(db, "orders"), order);
  return docRef.id;
};