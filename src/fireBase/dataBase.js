import { 
  collection, 
  getDocs, 
  query, 
  where, 
  getDoc, 
  doc, 
  setDoc,
  serverTimestamp,
  writeBatch,
  increment,
  limit,
  startAfter,
  orderBy,
  updateDoc,
  arrayUnion,
  arrayRemove
} from "firebase/firestore";
import { db } from "./config.js";

export const getItems = async () => {
  const querySnapshot = await getDocs(collection(db, 'productos'));
  return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

export const getPaginatedItems = async (lastVisible = null, pageSize = 8) => {
  let q;
  if (lastVisible) {
    q = query(
      collection(db, "productos"),
      orderBy("titulo"),
      startAfter(lastVisible),
      limit(pageSize)
    );
  } else {
    q = query(
      collection(db, "productos"),
      orderBy("titulo"),
      limit(pageSize)
    );
  }
  const querySnapshot = await getDocs(q);
  return {
    products: querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })),
    lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1]
  };
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

export const createOrder = async (buyerData, items, total, userId = null) => {
  const batch = writeBatch(db);
  const ordersCollection = collection(db, "orders");
  const newOrderRef = doc(ordersCollection);

  const order = {
    buyer: buyerData,
    userId: userId,
    items: items.map(item => ({
      id: item.id,
      titulo: item.titulo,
      precio: item.precio,
      cantidad: item.cantidad
    })),
    total: total,
    status: "generada",
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

export const getOrdersByUserId = async (userId) => {
  const q = query(collection(db, "orders"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

export const getBannerSettings = async (bannerId) => {
  const docRef = doc(db, "banners", bannerId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

export const updateBannerSettings = async (bannerId, data) => {
  const docRef = doc(db, "banners", bannerId);
  await setDoc(docRef, data, { merge: true });
};

export const addFavoriteToFirebase = async (uid, product) => {
  try {
    const userRef = doc(db, "usuarios", uid);
    await updateDoc(userRef, {
      favoritos: arrayUnion(product)
    });
  } catch (error) {
    console.error(error);
  }
};

export const removeFavoriteFromFirebase = async (uid, productId, product) => {
  try {
    const userRef = doc(db, "usuarios", uid);
    await updateDoc(userRef, {
      favoritos: arrayRemove(product)
    });
  } catch (error) {
    console.error(error);
  }
};
