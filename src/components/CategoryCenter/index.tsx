import { ChangeEvent, useState } from "react";
import { Product } from "../../types";
import ProductCard from "../ProductCard";
import Loading from "../ProductCard/loading";
type props = {
  data: Product[] | null;
  setFilter: React.Dispatch<React.SetStateAction<Product[]>>;
  loading: boolean;
};
function CategoryCenter({ data, setFilter, loading }: props) {
  const [filterOption, setFilterOption] = useState("all");
  const filters = [
    "all",
    "highest rated",
    "lowest rated",
    "Price: $$ - $",
    "Price: $ - $$",
  ];
  // with the dropdown we sort the items.
  function handleFilter(e: ChangeEvent<HTMLSelectElement>) {
    if (data === null) return;
    const filtered = data.slice();
    switch (e.target.value) {
      case "highest rated":
        filtered.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case "lowest rated":
        filtered.sort((a, b) => a.rating.rate - b.rating.rate);
        break;
      case "Price: $$ - $":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "Price: $ - $$":
        filtered.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }
    setFilterOption(e.target.value);
    setFilter(filtered);
  }
  return (
    <div className="space-y-6">
      <section className="flex justify-between flex-col space-y-8 md:space-y-0 md:flex-row lg:space-x-[50%] px-8 mb-24">
        <p className="text-gray-800">
          <span className="text-[#0808de] font-semibold">
            {data !== null ? data.length : 0}
          </span>{" "}
          Products found
        </p>
        {/* filter comes here. */}
        <form>
          <select
            name="filter"
            id="filter"
            className="border border-gray-400 shadow-sm focus:border-black px-6 py-2 border-solid"
            value={filterOption}
            onChange={handleFilter}
          >
            {filters.map((filter, index) => (
              <option key={index}>{filter}</option>
            ))}
          </select>
        </form>
      </section>
      <section className="grid grid-flow-row-dense gap-[50px] grid-cols-1 lg:grid-cols-2 lg:gap-[5%] px-8">
        {data !== null &&
          data.map((product) => (
            <ProductCard
              id={product.id}
              category={product.category}
              description={product.description}
              image={product.image}
              price={product.price}
              rating={product.rating}
              title={product.title}
              key={`${product.title}-${product.id}-${product.price * 2}`}
            />
          ))}
        {loading &&
          new Array(5).fill("").map((_, index) => <Loading key={index} />)}
      </section>
    </div>
  );
}

export default CategoryCenter;
