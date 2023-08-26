import Banner from "../../components/Banner"
import CategoryLinks from "../../components/CategoryLinks"
import ProductsRow from "../../components/ProductsRow"
import Brands from '../../components/Brands'
import { Variants, motion } from "framer-motion"
function Home() {
  const container :Variants = {
    hidden:{
    
       opacity:0
    },
    show:{
     
      opacity:1,
      transition:{   
        duration:1,
        ease:'easeIn',
       
      }
    },
    exit:{
      opacity:0,
      transition:{
        duration:1,
        ease:'easeIn'
      }
    }
  }
  return (
    <motion.div className="mt-[5rem]" variants={container} exit={'exit'} initial={'hidden'} animate={"show"}> 
        <Banner/>
        <CategoryLinks/>
        <ProductsRow/>
        <Brands/>
    </motion.div>
  )
}

export default Home