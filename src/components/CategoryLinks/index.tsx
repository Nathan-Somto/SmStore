import { Link, useNavigate } from "react-router-dom";
import { men, women, accessory } from "../../assets/CategoryLinks";
function CategoryLinks() {
  const navigate = useNavigate();
  const items = [
    {
      heading: "Men",
      imgUrl: men,
      url: "/products/category/men's clothing",
    },
    {
      heading: "Women",
      imgUrl: women,
      url: "/products/category/women's clothing",
    },
    {
      heading: "Accessory",
      imgUrl: accessory,
      url: "/products/category/jewelery",
    },
  ];
  return (
    <div className="flex flex-wrap justify-center  w-full my-12">
      {items.map((item, _index) => (
        <Link
          to={item.url}
          key={item.heading}
          className="max-h-[350px] group overflow-hidden relative border border-solid mr-3 mb-3 rounded-[4px] border-[#cbcaca]"
        >
          <div className="absolute top-[10px] z-[5] font-bold text-[#525252] left-[20px] group-hover:text-white">
            <h2>{item.heading}</h2>
          </div>
          <img
            src={item.imgUrl}
            alt={`${item.heading} image`}
            className="h-[300px] w-[80%] min-[450px]:w-[400px] lg:w-[300px] lg:h-[200px]"
          />
          <div className="overflow-y-hidden h-[45px] absolute left-[20px] bottom-10 z-[5] opacity-0 font-bold py-5 group-hover:opacity-100 border-b-2 border-solid border-[#fff] ">
            <p
              onClick={() => navigate(`${item.url}`)}
              className="translate-y-[80px] block group-hover:translate-y-0  uppercase text-white transition-all ease-in duration-300"
            >
              Shop now
            </p>
          </div>
          <div className="absolute h-full w-full z-[2] top-0 bg-[#795bf3] opacity-0 group-hover:opacity-60 transition-all ease-in duration-300 "></div>
        </Link>
      ))}
    </div>
  );
}

export default CategoryLinks;
