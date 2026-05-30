import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../fireBase/config';

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [siteConfig, setSiteConfig] = useState({
    maintenanceMode: false,
    footer: {
      address: '',
      phone: '',
      email: '',
      socials: { instagram: '', facebook: '', whatsapp: '' }
    }
  });
  const [loadingConfig, setLoadingConfig] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'config', 'global'), (docSnap) => {
      if (docSnap.exists()) {
        setSiteConfig(docSnap.data());
      }
      setLoadingConfig(false);
    }, (error) => {
      console.error(error);
      setLoadingConfig(false);
    });

    return () => unsub();
  }, []);

  return (
    <ConfigContext.Provider value={{ siteConfig, loadingConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
