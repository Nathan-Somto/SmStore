import Banner from "../../components/Banner"
import CategoryLinks from "../../components/CategoryLinks"
import ProductsRow from "../../components/ProductsRow"
import Brands from '../../components/Brands'
function Home() {
  /**
   * @todo: create  loading states for the product card when you connect to the fake store api.
   * 
   */
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