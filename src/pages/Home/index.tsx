import Banner from "../../components/Banner"
import CategoryLinks from "../../components/CategoryLinks"
import ProductsRow from "../../components/ProductsRow"
import Brands from '../../components/Brands'
function Home() {
  return (
    <div className="mt-[5rem]"> 
        <Banner/>
        <CategoryLinks/>
        <ProductsRow/>
        <Brands/>
    </div>
  )
}

export default Home