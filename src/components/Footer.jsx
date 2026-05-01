import React from 'react'
import { MessageCircle, Camera, Share2, Mail, MapPin, Phone, CreditCard } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-10 pb-6 font-sans">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          
          <div className="space-y-4">
            <div className="text-xl font-black tracking-tighter uppercase text-gray-900">
              De Todo <span className="text-blue-600"> Ecomerce</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed max-w-[200px]">
              Tu tienda multirrubro líder en Laferrere. Calidad y confianza en cada compra.
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <MessageCircle style={{ width: '20px', height: '20px' }} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Camera style={{ width: '20px', height: '20px' }} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Share2 style={{ width: '20px', height: '20px' }} />
              </a>
            </div>
          </div>

          {/* Ayuda */}
          <div>
            <h4 className="font-bold text-[13px] mb-4 uppercase tracking-wider text-gray-900">Ayuda</h4>
            <ul className="space-y-2 text-[13px] text-gray-600">
              <li className="hover:text-blue-600 cursor-pointer">Centro de Ayuda</li>
              <li className="hover:text-blue-600 cursor-pointer">Botón de Arrepentimiento</li>
              <li className="hover:text-blue-600 cursor-pointer">Mis Pedidos</li>
              <li className="hover:text-blue-600 cursor-pointer">Términos y Condiciones</li>
            </ul>
          </div>

          {/* Newsletter y Pagos */}
          <div>
            <h4 className="font-bold text-[13px] mb-4 uppercase tracking-wider text-gray-900 text-blue-600">Suscribite</h4>
            <div className="flex mb-4 max-w-[240px]">
              <input 
                type="email" 
                placeholder="Tu email" 
                className="bg-gray-100 border-none rounded-l-md px-3 py-2 w-full text-xs outline-none"
              />
              <button className="bg-blue-600 text-white px-3 py-2 rounded-r-md">
                <Mail style={{ width: '16px', height: '16px' }} />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-bold text-[11px] text-gray-900 uppercase">
                <CreditCard style={{ width: '16px', height: '16px' }} /> Medios de Pago
              </div>
              <div className="flex flex-wrap gap-1.5">
                 {['VISA', 'MASTER', 'AMEX', 'EFECTIVO'].map(pago => (
                   <span key={pago} className="text-[9px] font-bold border border-gray-200 px-1.5 py-0.5 rounded text-gray-500 bg-gray-50">
                     {pago}
                   </span>
                 ))}
              </div>
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-bold text-[13px] mb-4 uppercase tracking-wider text-gray-900">Contacto</h4>
            <div className="space-y-3 text-[13px] text-gray-600">
              <div className="flex items-start gap-2">
                <MapPin className="text-blue-600" style={{ width: '16px', height: '16px', marginTop: '2px' }} />
                <span>Laferrere, Buenos Aires</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="text-blue-600" style={{ width: '16px', height: '16px' }} />
                <span>0800-123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="text-blue-600" style={{ width: '16px', height: '16px' }} />
                <span>soporte@store.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 flex flex-col md:row justify-between items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          <p>© {new Date().getFullYear()} De todo Ecomerce. Todos los derechos reservados.</p>
          <p>Desarrollado con React & Tailwind</p>
        </div>
      </div>
    </footer>
  )
}