import React, { ChangeEvent, useState } from "react";
import { Product } from "../../types";
import ProductCard from '../ProductCard';
type props ={
    data:Product[],
    setFilter:  React.Dispatch<React.SetStateAction<Product[]>>
}
function CategoryCenter({data}:props) {
  const [filterOption, setFilterOption] = useState('all');
  const filters = ['all','highest rated','lowest rated','Price: $$ - $', 'Price: $ - $$'];
  function handleFilter(e:ChangeEvent<HTMLSelectElement>){
    console.log(e.target.value);
    switch (e.target.value) {
      case 'highest rated':
        let filtered = data.sort((a,b)=> b.rating.rate - a.rating.rate);
        console.log(filtered);
        break;
      case 'lowest rated':
         data.sort((a,b)=> a.rating.rate - b.rating.rate);
        break;
      case 'Price: $$ - $':
        data.sort((a,b)=> b.price - a.price);
        break;
      case 'Price: $ - $$':
        data.sort((a,b)=> a.price - b.price);
        break;
      default:
        break;
    }
    setFilterOption(e.target.value);
  }
  return (
    <div className="space-y-6">
        <section className="flex justify-between flex-col space-y-8 md:space-y-0 md:flex-row lg:space-x-[50%] px-8 mb-24">
            <p className="text-gray-800"><span className="text-[#0808de] font-semibold">{data.length}</span>   Products found</p>
            {/* filter comes here. */}
            <form>
              <select name="filter" id="filter" className="border border-gray-400 shadow-sm focus:border-black px-6 py-2 border-solid" value={filterOption} onChange={handleFilter}>
                {
                  filters.map((filter, index)=> <option key={index}>{filter}</option>)
                }
              </select>
            </form>
        </section>
        <section className="grid grid-flow-row-dense gap-[50px] grid-cols-1 lg:grid-cols-2 lg:gap-[5%] px-8">

        {
           data.map((product, index) => (
            <ProductCard
              id={product.id}
              category={product.category}
              description={product.description}
              image={product.image}
              price={product.price}
              rating={product.rating}
              title={product.title}
              key={`${product.title}-${index}-${product.id}-${product.price}`}
            />
          ))
        }
        </section>
    </div>
  )
}

export default CategoryCenter;