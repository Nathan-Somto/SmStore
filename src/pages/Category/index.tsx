import { useParams } from "react-router-dom";
import CategorySidebar from "../../components/CategorySidebar";
import CategoryCenter from "../../components/CategoryCenter";
import products from "../../data/products.json";
import { useEffect, useState } from "react";
import { Product, Category as CategoryType } from "../../types";
import Notfound from "../Notfound";
import {
  mens_clothing,
  womens_clothing,
  accessories,
  electronics,
} from "../../assets/Category";
type Images<T extends CategoryType> = {
  [P in T]: string;
};
function Category() {
  const [data, setData] = useState<Product[] | null>(null);
  const [filter, setFilter] = useState([]);
  const [error, setError] = useState(false);
  const { categoryname } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    const foundProducts: Product[] = products.filter(
      (product) => product.category === categoryname
    );
    if (!foundProducts.length) {
      setError(true);
    } else {
      setData(foundProducts);
    }
    return () => {};
  }, [categoryname]);
  if (error) return <Notfound />;
  const images: Images<CategoryType> = {
    jewelery: accessories,
    "men's clothing": mens_clothing,
    "women's clothing": womens_clothing,
    electronics: electronics,
  };
  return (
    <>
      {data !== null && (
        <>
          <header className="mt-[5rem] text-center h-[250px] mb-24 relative text-white group overflow-hidden">
            <img
              src={images[categoryname as CategoryType]}
              alt=""
              className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300 ease-linear"
            />
            <h1 className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] lg:text-5xl z-[3]">
              {categoryname}
            </h1>
            <div className="absolute top-0 h-full w-full bg-[rgba(0,0,0,0.5)] z-[2]"></div>
          </header>
          <main className="grid lg:grid-cols-[1fr_70%] gap-[50px] lg:gap-[5%] px-8 mb-[300px] min-h-screen ">
            <CategorySidebar />
            <CategoryCenter
              data={filter.length ? filter : data}
              setFilter={
                setFilter as React.Dispatch<React.SetStateAction<Product[]>>
              }
            />
          </main>
        </>
      )}
    </>
  );
}

export default Category;
