import { CartContext } from "./CartContext";
import { useState } from "react";

export function CartProvider({ children}){
    const [cart , setCart] = useState([])

    const addToCart = (product) =>{
        setCart([...cart, product])
    }
    const getCantidad = ()=>{
    if (cart.length === 0) {
        return 0;
    }
    const suma = cart.reduce((acc, product) => {
        const cantidadDelProducto = typeof product.cantidad === 'number' ? product.cantidad : parseInt(product.cantidad) || 0;
        return acc + cantidadDelProducto;
    }, 0);

    console.log(suma);
    return suma;
       
    }
    return(
        <CartContext.Provider value={{cart, addToCart, getCantidad}}>
            {children}
        </CartContext.Provider>
    )
}