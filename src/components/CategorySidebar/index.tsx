import { Link, useParams } from "react-router-dom";
import { Category } from "../../types";
import { AiOutlineDoubleRight } from "react-icons/ai";

function CategorySidebar() {
  /* make a call to the fake store api to get all categories */
  const categories: Category[] = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];
  // we get the categoryname to do some styling on the link.
  const { categoryname } = useParams();
  return (
    <aside className="px-6 ">
      <div>
        <h3 className="font-semibold text-2xl mb-16">Categories</h3>
        <div className="flex space-y-4 flex-col">
          {categories.map((category, index) => (
            <Link
              to={`/products/category/${category}`}
              key={index}
              className={`${
                category === categoryname
                  ? " space-x-1 flex items-center text-gray-900 font-medium"
                  : "text-gray-400 opacity-90 hover:text-gray-900 hover:opacity-100"
              }`}
            >
              {category === categoryname ? <AiOutlineDoubleRight /> : ""}
              <span>{category}</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default CategorySidebar;
