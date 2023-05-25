import { cart } from "../../types";
function useLocalStorage(): cart[]{
    const cart = localStorage.getItem('cart');
    if(cart === null){
        return [];
    }
    return JSON.parse(cart);
}

export {useLocalStorage};