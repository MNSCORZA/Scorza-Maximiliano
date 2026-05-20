import { 
  collection, 
  getDocs, 
  query, 
  where, 
  getDoc, 
  doc, 
  setDoc,
  addDoc,
  serverTimestamp,
  writeBatch,
  increment,
  limit,
  startAfter,
  orderBy,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc
} from "firebase/firestore";
import { db } from "./config.js";

export const saveLog = async (userId, userEmail, userNombre, accion, detalles) => {
  try {
    await addDoc(collection(db, "logs"), {
      userId,
      userEmail,
      userNombre,
      accion,
      detalles,
      fecha: serverTimestamp()
    });
  } catch (error) {
    console.error("Error al guardar log:", error);
  }
};

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

export const createOrder = async (buyerData, items, total, userId = null, couponId = null) => {
  const batch = writeBatch(db);
  const ordersCollection = collection(db, "orders");
  const newOrderRef = doc(ordersCollection);

  const order = {
    buyer: buyerData,
    userId: userId,
    uid: userId,
    items: items.map(item => ({
      id: item.id,
      titulo: item.titulo,
      precio: item.precio,
      cantidad: item.cantidad
    })),
    total: total,
    status: "generada",
    date: serverTimestamp(),
    cuponAplicadoId: couponId
  };

  batch.set(newOrderRef, order);

  items.forEach((item) => {
    const productRef = doc(db, "productos", item.id);
    batch.update(productRef, {
      stock: increment(-item.cantidad)
    });
  });

  if (couponId) {
    const couponRef = doc(db, "cupones", couponId);
    batch.update(couponRef, {
      usosActuales: increment(1)
    });
  }

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

export const addProductToHistoryFirebase = async (uid, product) => {
  try {
    const userRef = doc(db, "usuarios", uid);
    const productData = {
      id: product.id,
      titulo: product.titulo || "",
      precio: product.precio || 0,
      precioAnterior: product.precioAnterior || null,
      imagenUrl: product.imagenUrl || product.img || null,
      categoria: product.categoria || null,
      stock: product.stock || 0,
      ventas: product.ventas || 0
    };
    await updateDoc(userRef, {
      historial: arrayUnion(productData)
    });
  } catch (error) {
    console.error(error);
  }
};

export const saveUserCart = async (uid, cartItems) => {
  if (!uid) return;
  try {
    const cartRef = doc(db, 'carritos', uid);
    if (cartItems.length === 0) {
      await deleteDoc(cartRef);
      return;
    }
    await setDoc(cartRef, {
      uid,
      items: cartItems,
      status: 'activo',
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error(error);
  }
};

export const deleteUserCart = async (uid) => {
  if (!uid) return;
  try {
    await deleteDoc(doc(db, 'carritos', uid));
  } catch (error) {
    console.error(error);
  }
};
