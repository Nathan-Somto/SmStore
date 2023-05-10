import {createSlice} from '@reduxjs/toolkit'
// not too sure of this type will update later.
type cart ={
    id:number,
    quantity:number
}
type cartState = {
    items: cart[]
}
const initialState: cartState = {
    items:[]
}
export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:()=>{
        },
        increaseItemQuantity:()=>{
        },
        decreaseItemQuantity:()=>{
        },
        removeFromCart:()=>{
        }
    }

});

export const {addToCart,increaseItemQuantity,decreaseItemQuantity, removeFromCart } = cartSlice.actions
export const selectItem = (state:cartState) => state.items ;
export default cartSlice.reducer