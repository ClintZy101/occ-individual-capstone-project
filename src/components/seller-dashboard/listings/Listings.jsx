import React from 'react'
import SingleProduct from './SingleProduct'
import { products } from '../../../data/allproducts'

export default function Listings() {
  return (
    <div>
        <p className='font-semibold my-2 text-xl'>Listings</p>
        {/* Products Here */}
        <div>
            {products.map((item,i)=>(
                <SingleProduct item={item}  key={item.id}/>
            ))}
            
        </div>
    
    </div>
  )
}
