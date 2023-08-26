import { Link, useParams } from "react-router-dom";
import {
  increaseItemQuantity,
  decreaseItemQuantity,
  addToCart,
  selectItem,
  removeFromCart,
} from "../../features/cart/cartSlice";
import { useState, useEffect, useMemo } from "react";
import { Product, cart } from "../../types";
import Notfound from "../Notfound";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AiFillStar } from "react-icons/ai";
import Spinner from "../../components/Spinner";
import useAxios from "../../hooks/useAxios";
function ProductDetails() {
  const { id } = useParams();
  const { data, loading, error } = useAxios<Product>(`/products/${id}`);
  const [productData, setProductData] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    setProductData(data);
  }, [data]);
  const cartItems = useSelector(selectItem);
  const dispatch = useDispatch();
  const isIteminCart: number | -1 = useMemo(() => {
    if (productData !== null) {
      return cartItems.findIndex((item) => item.id === data?.id);
    }
    return -1;
  }, [cartItems, data?.id, productData]);
  /**
   * @todo  change the product fetching from json with an actual call to the fake store api
   */

  function handleAddToCart(data: Omit<cart, "quantity">) {
    toast.success(`${data.title.slice(0, 30)}... was added to the cart!`);
    dispatch(
      addToCart({
        ...data,
        quantity,
      })
    );
  }
  function handleIncrement(id: number) {
    if (isIteminCart === -1) {
      setQuantity((prevState) => prevState + 1);
      return;
    }
    dispatch(increaseItemQuantity(id));
  }
  function handleDecrement(id: number) {
    if (isIteminCart === -1 && quantity > 1) {
      setQuantity((prevState) => prevState - 1);
      return;
    }
    if (cartItems[isIteminCart].quantity > 1) {
      dispatch(decreaseItemQuantity(id));
      return;
    }
    if (productData !== null) {
      toast.success(
        `${productData.title.slice(0, 30)}... was removed from the cart!`
      );
    }
    dispatch(removeFromCart(id));
  }
  if (error) return <Notfound />;
  return (
    <div className="grid place-items-center  my-16">
      {loading && <Spinner />}
      {productData !== null && (
        <section className="w-[80%] lg:max-w-[1024px] mx-auto py-10">
          {/* Product information comes here please */}
          <div className="grid grid-cols lg:grid-cols-2 lg:gap-8 space-y-8 lg:space-y-0 transition-all ease-in duration-300">
            <img
              src={productData.image}
              alt={`${productData.title} poster`}
              className="max-h-[500px] object-contain h-full"
            />
            <div className=" self-center">
              <h1 className="font-bold lg:text-4xl mb-3">
                {productData.title}
              </h1>
              <Link
                to={`/products/category/${productData.category}`}
                className=" opacity-70 font-medium capitalize mb-3 text-gray-500"
              >
                {productData.category}
              </Link>
              <div className="flex space-x-3 items-center">
                <p className="text-2xl font-bold  text-gray-600">
                  ${productData.price}
                </p>
                {/* the rating for item */}
                <div className="flex space-x text-[#e7b11f]">
                  {new Array(((productData.rating.rate * 10) % 5) + 1)
                    .fill("")
                    .map((_, index) => (
                      <span key={index}>
                        <AiFillStar />
                      </span>
                    ))}
                </div>
              </div>
              <div className="border-t border-[#bbbbbb] border-solid pt-4 mt-4 text-[15px] opacity-70 text-gary-500 ">
                <p>{productData.description}</p>
              </div>
              <div className="flex justify-between flex-row-reverse items-center mt-6">
                <button
                  className="addto-cart py-2 px-6"
                  disabled={isIteminCart !== -1}
                  onClick={() => handleAddToCart({ ...productData })}
                >
                  {isIteminCart === -1 ? "Add to cart" : "Item in cart"}
                </button>
                <div className="space-x-3">
                  <button
                    onClick={() => handleIncrement(productData.id)}
                    className="cart-btn"
                  >
                    +
                  </button>
                  {/* using the index that is gotten from isIteminCart we get the quantity and update it with redux dispatch or switch to our state. */}
                  <span>
                    {cartItems[isIteminCart]
                      ? cartItems[isIteminCart].quantity
                      : quantity}
                  </span>
                  <button
                    onClick={() => handleDecrement(productData.id)}
                    className="cart-btn"
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </section>
      )}
    </div>
  );
}

export default ProductDetails;
