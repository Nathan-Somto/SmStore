type categories = "men's clothing" | "women's clothing" | "accessories" | "electronics";
interface product{
    id:number;
    title:string;
    price:number;
    category:categories;
    image:string;
    rating:{
        rate:number;
        count:number
    }
}

export type {categories, product}