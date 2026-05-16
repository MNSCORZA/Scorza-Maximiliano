import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getBannerSettings } from '../fireBase/dataBase';

const PromoBanner = () => {
  const [promo, setPromo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromo = async () => {
      try {
        setLoading(true);
        const data = await getBannerSettings('promo_static');
        if (data) {
          setPromo(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPromo();
  }, []);

  if (loading) {
    return (
      <div className="bg-blue-50 border-b border-blue-100 py-2 h-[37px] flex items-center justify-center relative z-40 overflow-hidden">
        <div className="h-2 bg-blue-200 rounded-full w-1/3 max-w-xs animate-pulse" />
      </div>
    );
  }

  if (!promo || !promo.active) return null;

  const content = (
    <div className="bg-blue-50 border-b border-blue-100 py-2 text-center relative z-40">
      <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-blue-900">
        ⚡ {promo.text}
      </p>
    </div>
  );

  return promo.link ? (
    <Link to={promo.link} className="block hover:opacity-95 transition-opacity">
      {content}
    </Link>
  ) : (
    content
  );
};

export default PromoBanner;
