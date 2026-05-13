import { db } from '../fireBase/config';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const productsCollection = collection(db, "productos");

export const getProducts = async () => {
    const data = await getDocs(productsCollection);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const createProduct = async (product) => {
    return await addDoc(productsCollection, product);
};

export const updateProduct = async (id, product) => {
    return await updateDoc(doc(db, "productos", id), product);
};

export const deleteProduct = async (id) => {
    return await deleteDoc(doc(db, "productos", id));
};