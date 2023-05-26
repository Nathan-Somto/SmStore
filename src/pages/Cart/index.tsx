import { useDispatch, useSelector } from "react-redux";
import {
  selectItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  removeFromCart,
  totalPrice,
  emptyCart,
} from "../../features/cart/cartSlice";
import { calculatePercentageOn } from "../../utils";
import { FaTrash } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function Checkout() {
  // the state that is gotten from the redux store
  const cartItems = useSelector(selectItem);
  let priceTotal = useSelector(totalPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // helps to increment the quantity for a particular cart item.
  function handleIncrement(id: number) {
    dispatch(increaseItemQuantity(id));
  }
  function handleDecrement(quantity: number, id: number) {
    if (quantity === 1) {
      dispatch(removeFromCart(id));
      return;
    }
    dispatch(decreaseItemQuantity(id));
  }
  function handleRemove(id: number) {
    dispatch(removeFromCart(id));
  }
  function handleClear() {
    dispatch(emptyCart());
  }
  const quantity = cartItems.reduce((acc, next) => acc + next.quantity, 0);
  const totalItems = cartItems.length;
  const deliveryFee = priceTotal * (5 / 100);
  priceTotal = +calculatePercentageOn(priceTotal, 5);

  return (
    <main className="mt-[8rem] px-6 mb-[5rem] max-w-[800px] space-y-12 mx-auto">
      {cartItems.length !== 0 ? (
        <>
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold ml-[1rem]">Shopping Cart</h1>
            <p
              className="opacity-70 text-[#141414] underline"
              onClick={() => handleClear()}
            >
              Clear cart
            </p>
          </div>
          <section className="grid grid-cols-1 md:grid-cols-[2fr_1fr] w-full md:gap-[8%]">
            <div className="pb-4 divide-y-2 border-b-2 border-solid border-[#d0cfcf] sm:border-b-0 mb-4 sm:mb-0 ">
              {cartItems.map((cartItem, index) => (
                <div
                  key={`${cartItem.id}-${index + 15}-${index}`}
                  className="flex border-[#d0cfcf] flex-col sm:flex-row py-[1rem] space-y-6 relative sm:space-y-0  sm:space-x-7"
                >
                  <img
                    src={cartItem.image}
                    alt=""
                    className="h-[150px] object-contain  w-[200px] "
                  />
                  <div className="max-w-[300px] sm:w-[300px]  space-y-3 md:pt-[1rem]">
                    <div className="flex justify-between items-start">
                      <h3 className="w-[80%] line-clamp-2 break-words font-semibold">
                        {cartItem.title}
                      </h3>
                      <button
                        className="hover:opacity-60"
                        onClick={() => handleRemove(cartItem.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                    <p className="capitalize opacity-70 text-[#141414] font-medium">
                      {cartItem.category}
                    </p>
                    <div className="flex justify-between">
                      <p className="text-[1.1rem] font-semibold">
                        ${cartItem.price}
                      </p>
                      <div className="space-x-3">
                        <button
                          className="bg-[#242424] text-white px-2 rounded-[4px] text-[1.1rem] hover:opacity-50"
                          onClick={() => handleIncrement(cartItem.id)}
                        >
                          +
                        </button>
                        <span>{cartItem.quantity}</span>
                        <button
                          className="bg-[#242424] text-white px-2 rounded-[4px] text-[1.1rem] hover:opacity-50"
                          onClick={() =>
                            handleDecrement(cartItem.quantity, cartItem.id)
                          }
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4 md:mt-[-1.5rem] font-medium ">
              <h3 className="font-bold text-xl">Order Summary</h3>
              <div className="flex justify-between">
                <p>Quantity</p>
                <p className="opacity-60">{quantity}</p>
              </div>
              <div className="flex justify-between">
                <p>Total items</p>
                <p className="opacity-60">{totalItems}</p>
              </div>
              <div className="flex justify-between">
                <p>Delivery fee</p>
                <p className="opacity-60">${deliveryFee.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Sub Total</p>
                <p className="opacity-60">${priceTotal}</p>
              </div>
              <button onClick={()=> navigate('/checkout')} className="bg-[#242424] text-white py-2 px-8 rounded-[6px] w-full">
                Proceed to checkout
              </button>
            </div>
          </section>
        </>
      ) : (
        <div className="text-center space-y-6 text-[1.1rem]  text-[#141414] ">
          <HiOutlineShoppingBag size="100" className="block w-full" />
          <div className="space-y-2">
            <p>Your Shopping Cart is empty 🙁</p>
            <p>Continue your shopping and add items to your cart</p>
          </div>
          <button
            className="bg-[#242424] text-white py-2 px-8 rounded-[6px] w-[60%] mx-auto block"
            onClick={() => navigate("/")}
          >
            Go back to Shopping
          </button>
        </div>
      )}
    </main>
  );
}

export default Checkout;
