import { useSelector, useDispatch } from "react-redux";
import {
  selectItem,
  totalPrice,
  removeFromCart,
} from "../../features/cart/cartSlice";
import { Link } from "react-router-dom";
import { FaTimes, FaTrash } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
function CartMenu({
  setOpenMenu,
}: {
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const cartItems = useSelector(selectItem);
  const total = useSelector(totalPrice);
  const dispatch = useDispatch();
  function handleRemoveFromCart(id: number) {
    dispatch(removeFromCart(id));
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeIn" }}
      className="min-h-screen h-auto w-full z-[1000] fixed top-0 left-0 bg-[rgba(0,0,0,0.5)]"
    >
      <motion.div
        initial={{ x: "100vh" }}
        animate={{ x: "0vh" }}
        transition={{
          delay: 0.2,
          duration: 0.7,
          ease: "easeIn",
          delayChildren: 2,
        }}
        className="min-h-screen right-0 absolute w-[calc(100%-20px)] sm:w-[400px] px-6 py-2 space-y-6 bg-white"
      >
        <div className="flex justify-between pt-4 items-center font-semibold text-4xl">
          <h2>YOUR CART</h2>
          <button
            className="text-[40px] hover:opacity-80  text-[#494949]"
            onClick={() => setOpenMenu((prevState) => !prevState)}
          >
            <FaTimes />
          </button>
        </div>
        <AnimatePresence>
          <div className="h-[65vh] overflow-auto space-y-6">
            {/* Cart items come here */}
            {cartItems.length === 0 ? (
              <div className="self-center text-center space-y-2 opacity-70 text-[#141414] ">
                <p>Your Cart is empty 🙁</p>
                <p>Continue your shopping and add items to your cart</p>
              </div>
            ) : (
              cartItems.map((cartItem, index) => (
                /* Cart card */
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.35 + 0.45, duration: 1 }}
                  key={`${cartItem.id}-${index * 3}`}
                  exit={{ scale: 0.5, x: "100vh" }}
                  className="flex space-x-4 h-[100px] items-center space-y-3"
                >
                  <Link to={`/products/${cartItem.id}`}>
                    <img
                      src={cartItem.image}
                      alt={cartItem.title.slice(0, 25) + " poster"}
                      className="h-full w-[80px] object-contain hover:scale-110 transition-all ease-out duration-200"
                    />
                  </Link>
                  <div className="w-[200px] break-words space-y opacity-70 text-[#141414] ">
                    <h3 className="line-clamp-2">{cartItem.title}</h3>
                    <p>{`${cartItem.quantity}x $${cartItem.price}`}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveFromCart(cartItem.id)}
                    className=" hover:opacity-80  text-[#494949]"
                  >
                    <FaTrash />
                  </button>
                </motion.div>
              ))
            )}
          </div>
        </AnimatePresence>
        <div>
          <p>Total: {`$${total.toFixed(2)}`} </p>
        </div>
        <div className="flex space-x-6 items-center ">
          <Link
            to={"/cart"}
            onClick={() => setOpenMenu((prevState) => !prevState)}
            className="px-6 py-2 bg-[#1b1b1b] hover:bg-[#2206fb] transition-all ease-in duration-300 text-white rounded-[18px]"
          >
            VIEW CART
          </Link>
          <Link
            to={"/checkout"}
            className="px-6 py-2 bg-[#1b1b1b] hover:bg-[#2206fb] transition-all ease-in duration-300 text-white rounded-[18px]"
          >
            CHECK OUT
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default CartMenu;
