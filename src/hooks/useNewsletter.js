import { useState, useEffect } from 'react';
import { db } from '../fireBase/config';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { toast } from 'sonner';

export const useNewsletter = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const q = query(collection(db, 'newsletter'), orderBy('fecha', 'desc'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setEmails(data);
      } catch (error) {
        console.error(error);
        toast.error('Error al cargar la lista de suscriptores');
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  const handleCopyAll = () => {
    if (emails.length === 0) return;
    
    const allEmailsString = emails.map(e => e.email).join(', ');
    navigator.clipboard.writeText(allEmailsString);
    setCopied(true);
    toast.success('Todos los emails fueron copiados al portapapeles');
    setTimeout(() => setCopied(false), 2000);
  };

  return { emails, loading, copied, handleCopyAll };
};
