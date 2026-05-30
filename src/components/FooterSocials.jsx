import React from 'react';
import { MessageCircle, Camera, Share2 } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export const FooterSocials = () => {
  const { siteConfig, loadingConfig } = useConfig();
  
  if (loadingConfig) return null;

  const socials = siteConfig?.footer?.socials || {};

  const getUrl = (handle, platform) => {
    if (!handle) return '#';
    if (handle.startsWith('http')) return handle;
    if (platform === 'whatsapp') return `https://wa.me/${handle.replace(/\D/g, '')}`;
    return `https://${platform}.com/${handle}`;
  };

  return (
    <div className="flex gap-4 pt-2">
      <a 
        href={getUrl(socials.whatsapp, 'whatsapp')} 
        target="_blank" 
        rel="noreferrer" 
        className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full text-gray-400 hover:bg-green-500 hover:text-white transition-all duration-300"
      >
        <MessageCircle size={20} />
      </a>
      <a 
        href={getUrl(socials.instagram, 'instagram')} 
        target="_blank" 
        rel="noreferrer" 
        className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full text-gray-400 hover:bg-pink-500 hover:text-white transition-all duration-300"
      >
        <Camera size={20} />
      </a>
      <a 
        href={getUrl(socials.facebook, 'facebook')} 
        target="_blank" 
        rel="noreferrer" 
        className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
      >
        <Share2 size={20} />
      </a>
    </div>
  );
};