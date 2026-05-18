
import { LayoutGrid, ShoppingBag, Wrench, Laptop, Home, Heart, BookOpen, Bike, Compass } from 'lucide-react';

export const categoryStyleMap = {
  bazar: {
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&auto=format&fit=crop&q=60',
    icon: <Home className="text-white" size={20} />
  },
  electronica: {
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&auto=format&fit=crop&q=60',
    icon: <Laptop className="text-white" size={20} />
  },
  herramientas: {
    image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=500&auto=format&fit=crop&q=60',
    icon: <Wrench className="text-white" size={20} />
  },
  indumentaria: {
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&auto=format&fit=crop&q=60',
    icon: <ShoppingBag className="text-white" size={20} />
  },
  ropa: {
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&auto=format&fit=crop&q=60',
    icon: <ShoppingBag className="text-white" size={20} />
  },
  jardin: {
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500&auto=format&fit=crop&q=60',
    icon: <Compass className="text-white" size={20} />
  },
  juegos: {
    image: 'https://images.unsplash.com/photo-1539627831859-a911cf04d3cd?w=500&auto=format&fit=crop&q=60',
    icon: <Bike className="text-white" size={20} />
  },
  juguetes: {
    image: 'https://images.unsplash.com/photo-1539627831859-a911cf04d3cd?w=500&auto=format&fit=crop&q=60',
    icon: <Bike className="text-white" size={20} />
  },
  belleza: {
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop&q=60',
    icon: <Heart className="text-white" size={20} />
  },
  hogar: {
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop&q=60',
    icon: <Home className="text-white" size={20} />
  },
  libros: {
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&auto=format&fit=crop&q=60',
    icon: <BookOpen className="text-white" size={20} />
  },
  deportes: {
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&auto=format&fit=crop&q=60',
    icon: <Bike className="text-white" size={20} />
  },
  default: {
    image: 'https://images.unsplash.com/photo-1522204538344-922f76ecc041?w=500&auto=format&fit=crop&q=60',
    icon: <LayoutGrid className="text-white" size={20} />
  }
};
