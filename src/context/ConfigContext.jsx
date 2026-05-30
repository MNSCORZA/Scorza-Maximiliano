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
        const data = docSnap.data();
        setSiteConfig({
          maintenanceMode: !!data.maintenanceMode,
          footer: {
            address: data.footer?.address || '',
            phone: data.footer?.phone || '',
            email: data.footer?.email || '',
            socials: {
              instagram: data.footer?.socials?.instagram || '',
              facebook: data.footer?.socials?.facebook || '',
              whatsapp: data.footer?.socials?.whatsapp || ''
            }
          }
        });
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