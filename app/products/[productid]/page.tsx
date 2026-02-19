// "use client"
import { log } from 'console'
import React from 'react'

const ProductId = async (params:{params:Promise<{productid:string}>}) => {
    // console.log(params.productid);
    const {productid} = await params.params
    console.log(productid);
    
    
  return (
    <div>This is ProductId {productid}</div>
  )
}

export default ProductId