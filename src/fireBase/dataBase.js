import { db } from "./config";
import { 
  collection, 
  addDoc, 
  doc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  writeBatch, 
  increment, 
  serverTimestamp,
  setDoc
} from "firebase/firestore";

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

export const getProducts = async () => {
  const productsCollection = collection(db, "productos");
  const querySnapshot = await getDocs(productsCollection);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getProductById = async (id) => {
  const productRef = doc(db, "productos", id);
  const productSnap = await getDoc(productRef);
  if (productSnap.exists()) {
    return { id: productSnap.id, ...productSnap.data() };
  } else {
    throw new Error("Producto no encontrado");
  }
};

export const deleteUserCart = async (userId) => {
  if (!userId) return;
  const cartRef = doc(db, "carritos", userId);
  await deleteDoc(cartRef);
};

export const addFavoriteToFirebase = async (userId, productId) => {
  if (!userId || !productId) return;
  const favRef = doc(db, "usuarios", userId, "favoritos", productId);
  await setDoc(favRef, { id: productId, addedAt: serverTimestamp() });
};

export const removeFavoriteFromFirebase = async (userId, productId) => {
  if (!userId || !productId) return;
  const favRef = doc(db, "usuarios", userId, "favoritos", productId);
  await deleteDoc(favRef);
};
