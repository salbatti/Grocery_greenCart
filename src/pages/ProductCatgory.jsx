import React from 'react'
import { useAppContext } from '../context/AppContent'

const ProductCatgory = () => {
  const {products} =useAppContext()
  const {category} =useParams()

  const searchCategory = categories.find((item)=> item.path.toLowerCase() === category )
    
  const filteredProducts = products.filter((product)=>product.category.toLowerCase() === category)
  return (
    <div>

    </div>
  )
}

export default ProductCatgory