import { img1, img2, img3 } from "../../assets/Banner";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";
function Banner() {
  const navigate = useNavigate();
  const items = [
    {
      heading1: "Men's Collection",
      para: "New Arrivals",
      imgUrl: img1,
      link:  "men's clothing"
    },
    {
      heading1: "Women's Collection",
      para: "New Season's",
      imgUrl: img2,
      link: "women's clothing"
    },
    {
      heading1: "Accessories",
      para: "Slick Jacket",
      imgUrl: img3,
      link: 'jewelery'
    },
  ];
  return (
    <header>
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        interval={3000}
      >
        {items.map((item, index) => (
          <div className="relative" key={index}>
            <img
              src={`${item.imgUrl}`}
              className={`  bg-no-repeat w-full bg-center max-[500px]:h-[300px] max-[500px]:max-w-[150%] max-[500px]:w-[500px] `}
              alt={`${item.heading1} image`}
            />
            <div className="absolute space-y-3 text-left left-[10%] lg:space-y-7 top-[30%] ">
              <h3 className="lg:text-3xl opacity-70 ">{item.heading1}</h3>
              <h1 className="lg:text-[55px] ">{item.para}</h1>
              <button onClick={() =>navigate(`/category/${item.link}`)} className="py-2 px-10 font-semibold bg-[#2206fb] rounded-[24px] text-[#fff] hover:bg-[#272726] transition-all duration-300 ease-in ">
                Shop now
              </button>
            </div>
          </div>
        ))}
      </Carousel>
    </header>
  );
}

export default Banner;
