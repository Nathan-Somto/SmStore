import products from "../../data/products.json";
import { useRef, useState } from "react";
import { Category, Product } from "../../types";
import ProductCard from "../ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
type categoryFilter = "All" | Category;
function ProductsRow() {
  /* api call comes here  */
  const [localData, _setLocalData] = useState<Product[]>(products);
  const [filteredData, setFilteredData] = useState(localData);
  const selectedCategory = useRef<categoryFilter>("All");
  const rowRef = useRef<null | HTMLDivElement>(null);
  function filterData(category: categoryFilter) {
    selectedCategory.current = category;
    if (category === "All") {
      setFilteredData(localData);
      return;
    }
    const updated=localData.filter((item) => item.category === category)
    setFilteredData(updated);
   
  }
  const categoryFilters = [
    "All",
    "women's clothing",
    "men's clothing",
    "electronics",
    "jewelery",
  ];
  function handleScrollClick(scroll :"left"| "right"){
    // programatically scrolls through the row on click.
    if (rowRef.current !== null){
      const {clientWidth, scrollLeft} = rowRef.current;
      const scrollBy = scroll === "left" ? scrollLeft - clientWidth  : clientWidth + scrollLeft;
      rowRef.current.scroll({left:scrollBy, behavior:"smooth"});
    }
  }
  return (
    <section className="my-12 space-y-12">
      <h2 className="text-4xl font-bold text-center">
        <span>Explore</span> Products
      </h2>
      <div className="flex justify-evenly items-center">
        {categoryFilters.map((category, index) => (
          <button
            key={`${category}-${index}`}
            onClick={() => filterData(category as categoryFilter)}
            className={` text-[#1e1d1d] hover:opacity-100 hover:underline font-medium ${
              selectedCategory.current === category
                ? "opacity-100 underline "
                : "opacity-70 "
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="relative">

      <button onClick={()=>handleScrollClick("right")} className="absolute top-[50%] right-[10px] rounded-sm text-center bg-[#131313] hover:opacity-70 text-[#ebebeb] z-[10] p-2 shadow-md"><FaChevronRight className="h-4 w-4"/></button>
      <div className="overflow-x-auto no-scroll flex space-x-12 w-full h-[650px] " ref={rowRef}>
        {/* Product cards go here */}
        {filteredData.map((product, index) => (
          <ProductCard
            id={product.id}
            category={product.category}
            description={product.description}
            image={product.image}
            price={product.price}
            rating={product.rating}
            title={product.title}
            key={`${product.title}-${index}-${product.id}`}
          />
        ))}
      </div>
         <button onClick={()=>handleScrollClick("left")} className="absolute top-[50%] left-[10px] rounded-sm text-center bg-[#131313] hover:opacity-70 text-[#ebebeb] z-[10] p-2 shadow-md">
          <FaChevronLeft className="h-4 w-4"/>
          </button>
      </div>
    </section>
  );
}

export default ProductsRow;
