import { Link } from "react-router";
import { motion } from "framer-motion";

export const CategoryCard = ({ title, image, route, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      <Link 
        to={route} 
        className="group relative block overflow-hidden rounded-2xl bg-slate-900 min-h-[140px] h-full sm:h-48 md:h-64 flex flex-col justify-end"
      >
        <img
          src={image}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover opacity-50 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-40"
        />
        
        <div className="relative w-full p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end h-full pt-12">
          <h3 className="text-base sm:text-lg md:text-2xl font-black text-white mb-1 leading-tight tracking-tight drop-shadow-sm">
            {title}
          </h3>
          
          {description && (
            <p className="text-xs text-gray-300 line-clamp-2 mb-2 hidden sm:block">
              {description}
            </p>
          )}
          
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-sm font-bold text-blue-400 group-hover:text-blue-300 transition-colors mt-1 shrink-0">
            <span>Explorar sección</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  );
};
