import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router';
import { footerLinks } from '../constants/footerData';
import { FooterSocials } from './FooterSocials';
import { FooterSubscribe } from './FooterSubscribe';
import { useConfig } from '../context/ConfigContext';

export const Footer = () => {
  const { siteConfig } = useConfig();
  const footer = siteConfig?.footer || {};

  return (
    <footer className="bg-gray-900 border-t border-gray-800 pt-16 pb-8 font-sans text-gray-400">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">

          <div className="space-y-4">
            <div className="text-xl font-black tracking-tighter uppercase text-white">
              De Todo <span className="text-blue-500">Ecommerce</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-[240px]">
              Tu tienda líder en Laferrere. Calidad, confianza y los mejores repuestos y accesorios en un solo lugar.
            </p>
            <FooterSocials />
          </div>

          <div>
            <h4 className="font-bold text-[12px] mb-4 uppercase tracking-widest text-white border-b border-gray-800 pb-2">Ayuda</h4>
            <ul className="space-y-2.5 text-sm">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="hover:text-blue-400 transition-colors block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <FooterSubscribe />

          <div>
            <h4 className="font-bold text-[12px] mb-4 uppercase tracking-widest text-white border-b border-gray-800 pb-2">Contacto</h4>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="text-blue-500 shrink-0 mt-0.5" size={16} />
                <span className="text-xs leading-tight">{footer.address || ''}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-blue-500 shrink-0" size={16} />
                <span className="text-xs">{footer.phone || ''}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-blue-500 shrink-0" size={16} />
                <span className="text-xs hover:text-blue-400 cursor-pointer transition-colors">{footer.email || ''}</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
          <p>© {new Date().getFullYear()} De Todo Ecommerce. Todos los derechos reservados.</p>
          <p className="text-gray-600">Desarrollado con React & Tailwind</p>
        </div>
      </div>
    </footer>
  );
};
