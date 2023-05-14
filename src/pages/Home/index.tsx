import Banner from "../../components/Banner"
import CategoryLinks from "../../components/CategoryLinks"
import Brands from '../../components/Brands'
function Home() {
  return (
    <div className="mt-[5rem]"> 
        <Banner/>
        <CategoryLinks/>
        <Brands/>
    </div>
  )
}

export default Home