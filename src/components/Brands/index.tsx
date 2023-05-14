import { brand1,brand2,brand3, brand4, brand5, brand6 } from "../../assets/Brands"
function Brands() {
    const brandsImg = [brand1, brand2, brand3, brand4, brand5,brand6];
  return (
    <div className="grid place-items-center h-[50px] w-full overflow-hidden my-12">
        <div className="flex w-[calc(60px*20)] md:w-[calc(100px*20)] justify-between animate-smscroll md:animate-scroll">
        {brandsImg.map((item,index)=><img src={item} alt={`${item}`} key={index} className="w-[80px] md:w-[100px] h-auto"/>)}
        {brandsImg.map((item,index)=><img src={item} alt={`${item}`} key={index+item} className="w-[80px] md:w-[100px] h-auto"/>)}
        </div>
    </div>
  )
}

export default Brands