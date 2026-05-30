import React from 'react';
import { MessageCircle, Camera, Share2 } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export const FooterSocials = () => {
  const { siteConfig } = useConfig();
  const { socials } = siteConfig.footer;

  return (
    <div className="flex gap-4 pt-2">
      <a href={socials?.whatsapp || '#'} target="_blank" rel="noreferrer" className="p-2 bg-gray-800 rounded-full text-gray-400 hover:bg-green-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1">
        <MessageCircle size={18} />
      </a>
      <a href={socials?.instagram || '#'} target="_blank" rel="noreferrer" className="p-2 bg-gray-800 rounded-full text-gray-400 hover:bg-pink-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1">
        <Camera size={18} />
      </a>
      <a href={socials?.facebook || '#'} target="_blank" rel="noreferrer" className="p-2 bg-gray-800 rounded-full text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1">
        <Share2 size={18} />
      </a>
    </div>
  );
};
