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
  deleteDoc,
  onSnapshot
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
  if (couponId) {
    const couponRef = doc(db, "cupones", couponId);
    const couponSnap = await getDoc(couponRef);

    if (!couponSnap.exists()) {
      throw new Error("El cupón ingresado no es válido.");
    }

    const couponData = couponSnap.data();

    if (couponData.fechaExpiracion) {
      const hoy = new Date().toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" });
      const [fechaHoy] = hoy.split(" ");
      const [dia, mes, anio] = fechaHoy.replace(",", "").split("/");
      const hoyFormateado = `${anio}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
      if (hoyFormateado > couponData.fechaExpiracion) {
        throw new Error("El cupón utilizado ya se encuentra expirado.");
      }
    }

    if (couponData.limiteUsos !== null && couponData.usosActuales >= couponData.limiteUsos) {
      throw new Error("El cupón alcanzó su límite máximo de canjes.");
    }

    if (userId) {
      const qOrders = query(collection(db, "orders"), where("uid", "==", userId), where("cuponAplicadoId", "==", couponId));
      const ordersSnapshot = await getDocs(qOrders);
      if (!ordersSnapshot.empty) {
        throw new Error("Ya has utilizado este beneficio en un pedido anterior.");
      }
    }
  }

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
      cantidad: item.cantidad,
      imagenUrl: item.imagenUrl || item.img || null
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

    let clienteInfo = { nombre: "", apellido: "", telefono: "" };
    try {
      const userSnap = await getDoc(doc(db, "usuarios", uid));
      if (userSnap.exists()) {
        const uData = userSnap.data();
        const partes = (uData.nombre || "").trim().split(" ");
        clienteInfo = {
          nombre: partes[0] || "",
          apellido: uData.apellido || partes.slice(1).join(" ") || "",
          telefono: uData.telefono || ""
        };
      }
    } catch (err) {
      console.error(err);
    }

    await setDoc(cartRef, {
      uid,
      items: cartItems,
      status: 'activo',
      esAbandonado: true,
      clienteInfo,
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

export const listenAlertasNotRead = (callback) => {
  const q = query(
    collection(db, "alertas"),
    where("leida", "==", false),
    orderBy("fecha", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const alertas = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(alertas);
  }, (error) => {
    if (error.code === 'permission-denied') {
      return;
    }
    console.error(error);
  });
};

export const markAlertaAsRead = async (alertaId) => {
  try {
    const alertaRef = doc(db, "alertas", alertaId);
    await updateDoc(alertaRef, { leida: true });
  } catch (error) {
    console.error(error);
  }
};

export const exportAllCollectionsData = async () => {
  const collectionsToExport = ["productos", "cupones", "banners", "usuarios"];
  const backupData = {};

  for (const colName of collectionsToExport) {
    const querySnapshot = await getDocs(collection(db, colName));
    backupData[colName] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
  return backupData;
};

export const restoreCollectionData = async (backupData) => {
  const collectionsToRestore = ["productos", "cupones", "banners", "usuarios"];

  for (const colName of collectionsToRestore) {
    if (!backupData[colName]) continue;

    const currentSnapshot = await getDocs(collection(db, colName));
    const deleteBatch = writeBatch(db);
    currentSnapshot.docs.forEach((docSnap) => {
      deleteBatch.delete(doc(db, colName, docSnap.id));
    });
    await deleteBatch.commit();

    const itemsToData = backupData[colName];
    let batch = writeBatch(db);
    let counter = 0;

    for (const item of itemsToData) {
      const { id, ...data } = item;
      const docRef = doc(db, colName, id);
      batch.set(docRef, data);
      counter++;

      if (counter === 400) {
        await batch.commit();
        batch = writeBatch(db);
        counter = 0;
      }
    }

    if (counter > 0) {
      await batch.commit();
    }
  }
};

export const getCartRules = async () => {
  const q = query(collection(db, "reglas_carrito"), where("activa", "==", true));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

export const getAllUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "usuarios"));
  return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

export const getAllOrders = async () => {
  const querySnapshot = await getDocs(collection(db, "orders"));
  return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

export const updateUserInternalNotes = async (userId, notes) => {
  const userRef = doc(db, "usuarios", userId);
  await updateDoc(userRef, { notas: notes });
};