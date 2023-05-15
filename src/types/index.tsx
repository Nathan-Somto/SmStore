type Category ="electronics"|"jewelery"|"men's clothing"|"women's clothing"
interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
}
type cart = Omit<Product, "rating">& {
  quantity:number;
}

export type {Category, Product,cart}