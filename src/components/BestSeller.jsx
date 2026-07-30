import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContent';

const BestSeller = () => {
  const { products } = useAppContext();
  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
      <div className='  grid grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5    
        gap-2 
        sm:gap-4
        md:gap-5 
        lg:gap-6
        mt-6'>
        {products.filter((products) => products.inStock).slice(0, 5).map((products) => (
          <ProductCard key={products._id} product={products} />
        ))}
      </div>
    </div>
  )
}

export default BestSeller
