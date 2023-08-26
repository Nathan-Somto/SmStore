import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectItem } from "../../features/cart/cartSlice";
import { Link } from "react-router-dom";
import { HiOutlineShoppingBag, HiChevronDown } from "react-icons/hi";
import { AiOutlineHeart } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import CartMenu from "../CartMenu";
function Navbar() {
  /* mobile navbar state */
  const [toggleMobileNav, setToggleMobileNav] = useState(false);
  /* dropdown state */
  const [dropdown, setdropdown] = useState(false);
  /* open cart menu */
  const [openMenu, setOpenMenu] = useState(false);
  /* navbar scroll ref */
  const nav = useRef<HTMLElement | null>(null);
  useEffect(() => {
    function addShadow() {
      if (nav.current !== null) {
        if (window.scrollY > 80) {
          nav.current.classList.add("shadow-xl");
          return;
        }
        nav.current.classList.remove("shadow-xl");
      }
    }
    document.addEventListener("scroll", addShadow);
    return () => document.removeEventListener("scroll", addShadow);
  }, []);
  const cartItems = useSelector(selectItem);
  return (
    <nav
      ref={nav}
      className="flex w-full font-medium bg-[#fff] text-[#141414] flex-col lg:flex-row  h-[5rem] divide-y lg:divide-y-0 border-b fixed top-0 z-[100] lg:pl-[3.5rem] lg:items-center"
    >
      <div className="lg:mr-[5%] h-[2.5rem] justify-between flex items-center pl-[1.5rem] lg:pl-0 lg:h-[5rem]">
        <Link to={"/"} className="uppercase  font-bold">
          smstore
        </Link>
        <div
          className="hamburger mr-5 cursor-pointer lg:hidden"
          onClick={() => setToggleMobileNav((prevState) => !prevState)}
        >
          <span className="line mb-[0.35rem]"></span>
          <span className="line"></span>
        </div>
      </div>
      <div
        className={`lg:flex lg:space-x-4 ${
          toggleMobileNav ? "flex" : "hidden"
        } flex-col
      border-l border-solid border-[#dfdfdf] z-[100] 
      bg-[white] space-y-2 p-8 fixed top-0 right-0 min-h-screen
       w-2/4 md:w-[30%] lg:border-none lg:space-y-0 lg:z-[0] lg:p-0 
       lg:bg-transparent lg:flex-row lg:relative lg:w-full 
       lg:min-h-[5rem] lg:items-center `}
      >
        <div
          className="hamburger absolute right-[10px] top-[20px] cursor-pointer active lg:hidden"
          onClick={() => setToggleMobileNav((prevState) => !prevState)}
        >
          <span className="line mb-[0.35rem]"></span>
          <span className="line"></span>
        </div>
        <div>
          <p
            className={` cursor-pointer ${
              !dropdown ? "opacity-100" : "opacity-50"
            }`}
            onMouseEnter={() => setdropdown((prevState) => !prevState)}
          >
            Categories
            <HiChevronDown className="inline" size="20" />
          </p>
          <div
            onMouseLeave={() => setdropdown((prevState) => !prevState)}
            className={`${dropdown ? "flex" : "hidden"} relative 
          top-0 flex-col space-y-2 ml-8 mt-3 
          lg:mt-0 lg:ml-0 lg:space-y-0 lg:absolute pl-3 py-2 lg:items-center
           text-[#242] lg:top-[5.5rem] lg:flex-row lg:space-x-3  z-[20] rounded-md bg-white 
           lg:divide-x lg:px-3  lg:h-[3.5rem] left-[-2rem] 
           border border-solid border-[#ebebeb]`}
          >
            <Link to={"/products/category/jewelery"} className="dropdown-text">
              jewelery
            </Link>
            <Link
              to={"/products/category/men's clothing"}
              className="dropdown-text"
            >
              men's clothing
            </Link>
            <Link
              to={"/products/category/women's clothing"}
              className="dropdown-text"
            >
              women's clothing
            </Link>
          </div>
        </div>
        <Link to={"/about"}>About</Link>
        <Link to={"/contact"}>Contact</Link>
        <div
          className={`fixed min-h-screen w-2/4 md:w-[70%] left-0 top-0 z-[101] backdrop-blur-[6px] lg:hidden ${
            toggleMobileNav ? "flex" : "hidden"
          }`}
        ></div>
      </div>
      <div className="divide-x flex items-center justify-end lg:absolute lg:right-0">
        <form className="border-l h-[2.5rem] lg:h-[5rem] flex relative items-center">
          <button className="pl-3" type="button">
            <FaSearch color="#bbb" size="15" />
          </button>
          <label htmlFor="search">
            <input
              type="text"
              className="my-auto pl-3 h-[1.5rem] transition-all ease-in-out focus:border-none outline-none duration-300 max-[400px]:focus:w-[180px] min-[401px]:focus:w-[220px] min-[500px]:focus:w-[250px] sm:focus:w-[300px] w-[150px]"
              id="search"
              name="search"
              placeholder="type search"
            />
          </label>
        </form>
        <div className="lg:h-[5rem] h-[2.5rem] flex items-center text-[0.8rem] px-5 cursor-pointer">
          <BsPersonFill size="25" />
        </div>
        <div className="lg:h-[5rem] h-[2.5rem] flex items-center px-5 cursor-pointer">
          <AiOutlineHeart size="25" />
        </div>
        <div
          className="lg:h-[5rem] h-[2.5rem] flex relative items-center px-5 cursor-pointer"
          onClick={() => setOpenMenu((prevState) => !prevState)}
        >
          <HiOutlineShoppingBag size="25" />
          {/* Update the number with the redux value */}
          <span className="text-[#2323b7]  absolute right-[12px] top-[2px] lg:top-[20px] text-[0.75rem] font-bold w-4 h-4 text-center ">
            {cartItems.length}
          </span>
        </div>
      </div>
      {openMenu && <CartMenu setOpenMenu={setOpenMenu} />}
    </nav>
  );
}

export default Navbar;
