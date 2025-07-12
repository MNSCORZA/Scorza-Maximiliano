import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export const Cart = () => {
  const { cart}= useContext(CartContext)
  return (
    <div >
      {cart.map((prod) => <div>{prod.title } {prod.price} <img src={prod.thumbnail} alt={prod.title} /> {prod.cantidad} </div>)}
      
    
    </div>
  );
};

