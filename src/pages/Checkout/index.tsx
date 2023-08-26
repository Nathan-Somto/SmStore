import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import checkoutSchema, { Checkout as checkoutType } from "../../Schemas";
import { headerBg } from "../../assets/Checkout";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectItem, totalPrice } from "../../features/cart/cartSlice";
import { calculatePercentageOn } from "../../utils";
import { useEffect, useState } from "react";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import { useNavigate } from "react-router-dom";

function Checkout() {
  // default flutterwave config.
  const [config, setConfig] = useState({
    public_key: "FLWPUBK_TEST-c0f1f259361e85a7310818a8ae5e1edf-X",
    tx_ref: Date.now().toString(),
    amount: 100,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: "",
      phone_number: "",
      name: "",
    },
    customizations: {
      title: "SMSTORE",
      description: "Payment for items in cart",
      logo: "",
    },
  });
  const [Loading, setLoading] = useState(false);
  const cartItems = useSelector(selectItem);
  let priceTotal = useSelector(totalPrice);
  const {
    register,
    handleSubmit,
    formState: { errors},
  } = useForm<checkoutType>({
    resolver: yupResolver(checkoutSchema),
    mode: "onTouched",
  });
  const deliveryFee = priceTotal * (5 / 100);
  priceTotal = +calculatePercentageOn(priceTotal, 5);

  const Navigate = useNavigate();
  const handleFlutterPayment = useFlutterwave(config);
  function onSubmit(formData: checkoutType) {
    const { emailAddress, firstName, lastName, phoneNumber } = formData;

    setLoading(true);
    const updatedConfig = {
      ...config,
      amount: priceTotal * 400,
      customer: {
        ...config.customer,
        email: emailAddress,
        phone_number: phoneNumber,
        name: `${firstName} ${lastName}`,
      },
    };
    setConfig(updatedConfig);
    try {
      handleFlutterPayment({
        callback: (response) => {
          console.log(response.transaction_id);
          closePaymentModal();
          Navigate("/success");
        },
        onClose: () => {
          console.log('closed')
        },
      });
    } catch (err) {
      toast.error("an error occured while submitting the form", {
        position: "top-right",
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  }

  const countries = [
    "United States",
    "Nigeria",
    "United Kingdom",
    "France",
    "India",
    "Australia",
    "Brazil",
  ];
  useEffect(() => {
    if (cartItems.length === 0) {
      Navigate("/");
    }
  }, [Navigate, cartItems]);
  return (
    <main className="my-24  min-h-screen grid place-items-center">
      <div className="h-[300px] relative text-white overflow-hidden group w-full -mt-5 mb-12">
        <img
          src={headerBg}
          alt="header background"
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300 ease-linear"
        />
        <h1 className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] lg:text-5xl z-[3]">
          Checkout
        </h1>
        <div className="absolute top-0 h-full w-full bg-[rgba(0,0,0,0.5)] z-[2]"></div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 px-6 max-w-[1024px]  grid w-full grid-cols-1 lg:grid-cols-[2fr_1fr]"
      >
        <div className="max-w-[550px] w-full mx-auto lg:mx-0 space-y-4">
          <h3 className="font-bold">Billing Address</h3>
          <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row justify-between w-full">
            <div className=" md:w-[45%]">
              <label className="input-label">firstName</label>
              <input
                {...register("firstName")}
                type="text"
                id="firstName"
                className={`input-control ${
                  errors?.firstName?.message ? "input-invalid" : "input-valid"
                }`}
              />
              <small className="input-error">
                {errors?.firstName?.message}
              </small>
            </div>
            <div className=" md:w-[45%]">
              <label htmlFor="lastName" className="input-label">
                lastName
              </label>
              <input
                {...register("lastName")}
                type="text"
                id="lastName"
                className={`input-control ${
                  errors?.lastName?.message ? "input-invalid" : "input-valid"
                }`}
              />
              <small className="input-error">{errors?.lastName?.message}</small>
            </div>
          </div>
          <div>
            <label htmlFor="email" className="input-label">
              Email Adress
            </label>
            <input
              type="email"
              {...register("emailAddress")}
              id="email"
              className={`input-control ${
                errors?.emailAddress?.message ? "input-invalid" : "input-valid"
              }`}
            />
            <small className="input-error">
              {errors?.emailAddress?.message}
            </small>
          </div>
          <div>
            <label htmlFor="province" className="input-label">
              Province
            </label>
            <input
              type="text"
              {...register("province")}
              id="province"
              className={`input-control ${
                errors?.province?.message ? "input-invalid" : "input-valid"
              }`}
            />
            <small className="input-error">{errors?.province?.message}</small>
          </div>
          <div>
            <label htmlFor="city" className="input-label">
              City
            </label>
            <input
              type="text"
              {...register("city")}
              id="province"
              className={`input-control ${
                errors?.city?.message ? "input-invalid" : "input-valid"
              }`}
            />
            <small className="input-error">{errors?.city?.message}</small>
          </div>
          <div>
            <label htmlFor="country" className="input-label">
              Country
            </label>
            {/* country dropdown comes here */}
            <select name="" id="" className="input-control font-medium">
              {countries.map((country, index) => (
                <option key={index}>{country}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="address" className="input-label">
              Address
            </label>
            <input
              type="text"
              {...register("address")}
              className={`input-control ${
                errors?.address?.message ? "input-invalid" : "input-valid"
              }`}
            />
            <small className="input-error">{errors?.address?.message}</small>
          </div>

          <div>
            <label htmlFor="postCode" className="input-label">
              PostCode
            </label>
            <input
              type="number"
              {...register("postCode")}
              id="postCode"
              className={`input-control ${
                errors?.postCode?.message ? "input-invalid" : "input-valid"
              }`}
            />
            <small className="input-error">{errors?.postCode?.message}</small>
          </div>
          <div>
            <label htmlFor="phoneNumber" className="input-label">
              Phone No
            </label>
            <input
              type="number"
              {...register("phoneNumber")}
              id="phoneNumber"
              className={`input-control ${
                errors?.phoneNumber?.message ? "input-invalid" : "input-valid"
              }`}
            />
            <small className="input-error">
              {errors?.phoneNumber?.message}
            </small>
          </div>
          <div>
            <div>
              <div className="mt-5 font-medium text-[12px] uppercase ">
                <input type="checkbox" name="" id="" className="mr-4" />
                <label htmlFor="">Terms and Conditions</label>
              </div>
              <div className="mt-2 font-medium text-[12px] uppercase ">
                <input type="checkbox" name="" id="" className="mr-4" />
                <label htmlFor="">Subscribe to newsletter</label>
              </div>
              <div className="mt-2 font-medium text-[12px] uppercase ">
                <input type="checkbox" name="" id="" className="mr-4" />
                <label htmlFor="">Create an Account</label>
              </div>
            </div>
          </div>
        </div>
        <div className="border-2 border-solid border-[#ebebeb] p-6 min-w-[300px] relative">
          <h3 className="text-xl font-semibold mb-1">Your Order</h3>
          <p className="text-gray-500">The Details</p>
          <div className="flex justify-between border-b-2 border-solid border-[#ebebeb] pb-2 my-3">
            <p>Product</p>
            <p>Total</p>
          </div>
          {/* Get the title of product from store and it's total price. */}
          {cartItems.map((item, index) => (
            <div
              key={`${index}-${item.title}`}
              className="flex justify-between border-b-2 border-solid border-[#ebebeb] pb-2 my-3"
            >
              <p className="w-[70%]">{item.title}</p>
              <p>${item.price * item.quantity}</p>
            </div>
          ))}
          <div className="flex justify-between border-b-2 border-solid border-[#ebebeb] pb-2 my-3">
            <p>SubTotal</p>
            <p>${(priceTotal - deliveryFee).toFixed(2)}</p>
          </div>
          <div className="flex justify-between border-b-2 border-solid border-[#ebebeb] pb-2 my-3">
            <p>Shipping</p>
            <p>${deliveryFee.toFixed(2)}</p>
          </div>
          <div className="flex justify-between border-b-2 border-solid border-[#ebebeb] pb-2 my-3">
            <p>Total</p>
            <p>${priceTotal.toFixed(2)}</p>
          </div>
          <div className="ml-4 mt-6 font-semibold uppercase ">
            <input
              type="radio"
              className="mr-4"
              {...register("payment")}
              value="Paystack"
            />
            <label htmlFor="payment">Paystack</label>
          </div>
          <div className="ml-4 mt-2 font-semibold uppercase">
            <input
              type="radio"
              {...register("payment")}
              className="mr-4"
              value="Flutterwave"
              defaultChecked
            />
            <label htmlFor="payment">Flutterwave</label>
          </div>
          <input
            type="submit"
            value="place order"
            disabled={Loading || Object.values(errors).length !== 0}
            className="addto-cart ml-4 py-[0.625rem] px-6 mt-4  uppercase font-medium cursor-pointer"
          />
        </div>
      </form>
      {Loading && (
        <div className="fixed top-0 h-screen left-0 backdrop-blur-sm w-full flex justify-center items-center ">
          <div className="animate-spin h-[50px] w-[50px] p-4 border-2 border-t-transparent border-black rounded-full" />
        </div>
      )}
    </main>
  );
}

export default Checkout;
