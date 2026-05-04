import { Link } from "react-router";
import { motion } from "framer-motion";

export const CategoryCard = ({ title, image, route, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Link to={route} className="group relative block overflow-hidden rounded-2xl bg-gray-900 aspect-video md:aspect-auto md:h-64">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-40"
        />
        <div className="relative flex h-full flex-col items-start justify-end p-6 bg-gradient-to-t from-black/80 via-transparent to-transparent">
          <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
          {description && <p className="text-sm text-gray-300 line-clamp-2 mb-3">{description}</p>}
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
            Explorar sección
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  );
};