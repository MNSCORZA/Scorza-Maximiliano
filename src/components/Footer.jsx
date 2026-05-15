import React from 'react'
import { MessageCircle, Camera, Share2, Mail, MapPin, Phone, CreditCard } from 'lucide-react'

export const Footer = () => {
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
            <div className="flex gap-4 pt-2">
              <a href="#" className="p-2 bg-gray-800 rounded-full text-gray-400 hover:bg-green-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1">
                <MessageCircle size={18} />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full text-gray-400 hover:bg-pink-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1">
                <Camera size={18} />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1">
                <Share2 size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-[12px] mb-4 uppercase tracking-widest text-white border-b border-gray-800 pb-2">Ayuda</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors block">Centro de Ayuda</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors block">Botón de Arrepentimiento</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors block">Mis Pedidos</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors block">Términos y Condiciones</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[12px] mb-4 uppercase tracking-widest text-blue-400 border-b border-gray-800 pb-2">Suscribite</h4>
            <p className="text-xs text-gray-400 mb-3">Recibí ofertas exclusivas antes que nadie.</p>
            <div className="flex mb-4 max-w-[260px] group">
              <input 
                type="email" 
                placeholder="Tu email" 
                className="bg-gray-800 border border-gray-700 rounded-l-lg px-3 py-2 w-full text-xs text-white outline-none focus:border-blue-500 transition-colors"
              />
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-r-lg transition-colors flex items-center justify-center">
                <Mail size={14} />
              </button>
            </div>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 font-bold text-[11px] text-white uppercase tracking-wider">
                <CreditCard size={14} className="text-blue-400" /> Medios de Pago
              </div>
              <div className="flex flex-wrap gap-1.5">
                 {['VISA', 'MASTER', 'AMEX', 'EFECTIVO'].map(pago => (
                   <span key={pago} className="text-[9px] font-black border border-gray-700 px-2 py-0.5 rounded text-gray-300 bg-gray-850">
                     {pago}
                   </span>
                 ))}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-[12px] mb-4 uppercase tracking-widest text-white border-b border-gray-800 pb-2">Contacto</h4>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="text-blue-500 shrink-0 mt-0.5" size={16} />
                <span className="text-xs leading-tight">Gregorio de Laferrere, Buenos Aires</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-blue-500 shrink-0" size={16} />
                <span className="text-xs">0800-123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-blue-500 shrink-0" size={16} />
                <span className="text-xs hover:text-blue-400 cursor-pointer transition-colors">soporte@detodo.com</span>
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
  )
}
