import productData from '../../data/products.json';
import { Link, useParams } from 'react-router-dom';
import { increaseItemQuantity, decreaseItemQuantity, addToCart, selectItem, removeFromCart } from '../../features/cart/cartSlice';
import { useState, useEffect, useMemo } from 'react';
import { Product, cart } from '../../types';
import Notfound from '../Notfound';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AiFillStar } from 'react-icons/ai';
function ProductDetails() {
  const [data, setData] = useState<Product[] | null>(null);
  const [error, setError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const cartItems = useSelector(selectItem);
  const dispatch = useDispatch();
  const isIteminCart: number | -1 = useMemo(
    () => {
      if(data !== null){

        return cartItems.findIndex((item) => item.id === data[0]?.id);
      }
      return -1;
    },
    [cartItems,data]
  );
  /**
   * @todo  change the product fetching from json with an actual call to the fake store api
   */
  const {id} = useParams();
  useEffect(()=>{
   const foundProduct: undefined | Product = productData.find((item)=> item.id.toString() === id as unknown as string);
   if(!foundProduct){
    setError(true);
   }
   else{
    setData([foundProduct]);
   }
  },[]);
  function handleAddToCart(data: Omit<cart, "quantity">){
    toast.success(`${data.title.slice(0,30)}... was added to the cart!`)
     dispatch(addToCart({
      ...data,
      quantity
     }))
  }
  function handleIncrement(id:number){
   
    if(isIteminCart === -1){
      setQuantity(prevState=> prevState + 1);
      return;
    }
    dispatch(increaseItemQuantity(id));
  }
  function handleDecrement(id:number){
    if(isIteminCart === -1 && quantity > 1){
      setQuantity(prevState=> prevState - 1);
      return;
    }
    if(cartItems[isIteminCart].quantity > 1){

      dispatch(decreaseItemQuantity(id));
      return;
    }
    if(data !== null){
      toast.success(`${data[0].title.slice(0,30)}... was removed from the cart!`)
    }
    dispatch(removeFromCart(id));
  }
  if(error) return <Notfound/>;
  return (
    <div className="  grid place-items-center  my-16">{data&&
      <section className='w-[80%] lg:max-w-[1024px] mx-auto py-10'>
        {/* Product information comes here please */}
        <div className='grid grid-cols lg:grid-cols-2 lg:gap-8 space-y-8 lg:space-y-0'>
          <img src={data[0].image} alt="" className="max-h-[500px] object-contain h-full" />
          <div className=' self-center' >
           <h1 className="font-bold lg:text-4xl mb-3">{data[0].title}</h1>
           <Link to={`/category/${data[0].category}`} className=" opacity-70 font-medium capitalize mb-3 text-gray-500">{data[0].category}</Link>
           <div className='flex space-x-3 items-center'>
           <p className='text-2xl font-bold  text-gray-600'>${data[0].price}</p>
            {/* the rating for item */}
            <div className="flex space-x text-[#e7b11f]">
          {new Array(((data[0].rating.rate * 10) % 5) + 1).fill("").map((_, index) => (
            <span key={index}>
              <AiFillStar />
            </span>
          ))}
        </div>
           </div>
           <div className="border-t border-[#bbbbbb] border-solid pt-4 mt-4 text-[15px] opacity-70 text-gary-500 ">
            <p>{data[0].description}</p>
           </div>
           <div className="flex justify-between flex-row-reverse items-center mt-6">
          <button className="addto-cart py-2 px-6" disabled={isIteminCart !== -1 } onClick={()=>handleAddToCart({...data[0]})}>{isIteminCart === -1 ? "Add to cart":"Item in cart"}</button>
        <div className="space-x-3">
          <button onClick={()=> handleIncrement(data[0].id)} className="cart-btn">+</button>
          {/* using the index that is gotten from isIteminCart we get the quantity and update it with redux dispatch or switch to our state. */}
          <span>{cartItems[isIteminCart]? cartItems[isIteminCart].quantity :quantity}</span>
          <button  onClick={()=> handleDecrement(data[0].id)} className="cart-btn">-</button>
        </div>
        </div>
          </div>
        </div>
        <div>

     
        </div>
      </section>

      }</div>
  )
}

export default ProductDetails