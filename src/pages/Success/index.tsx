import { useEffect } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { emptyCart } from "../../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

function Success() {
  const dispatch = useDispatch();
  // empty the cart when this page loads.
  useEffect(() => {
    dispatch(emptyCart());
  }, [dispatch]);
  return (
    <div className="h-[100vh] w-[80%] mx-auto my-32  space-y-6 flex  flex-col text-center  items-center">
      <motion.div
        className="text-green-600"
        initial={{ scale: 0 }}
        animate={{ scale: [0.65, 0.75, 0.5, 1.2, 0.5, 0.75, 1] }}
        transition={{
          type: "spring",
          duration: 1.35,
          delay: 0.12,
          stiffness: 300,
        }}
      >
        <AiFillCheckCircle size="150" />
      </motion.div>
      <motion.div
        className="space-y-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.85, delay: 0.85, ease: "easeIn" }}
      >
        <h1 className="font-bold text-2xl sm:text-3xl w-[70%] mx-auto text-gray-800">
          Thank you for shopping with SmStore
        </h1>
        <p className="text-gray-700 text-[1.05rem]">we hope to see you soon.</p>
        <Link
          to="/"
          className="block cart-btn sm:w-[60%] min-w-[200px] py-4 mx-auto max-w-[350px]"
        >
          Continue Your Shopping
        </Link>
      </motion.div>
    </div>
  );
}

export default Success;
