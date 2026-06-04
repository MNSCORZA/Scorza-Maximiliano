import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../fireBase/config';

export const createOrderClaim = async (orderId, reason, comment) => {
  const orderRef = doc(db, "orders", orderId);
  
  const claimData = {
    status: "reclamo",
    claim: {
      motivo: reason,
      comentario: comment,
      fecha: new Date(),
      resolucion: null
    },
    claimTimeline: [
      {
        fecha: new Date(),
        titulo: "Reclamo Iniciado",
        descripcion: `El cliente abrió un reclamo por: "${reason}". Nota: "${comment}"`,
        tipo: "user"
      }
    ]
  };

  await updateDoc(orderRef, claimData);
};
