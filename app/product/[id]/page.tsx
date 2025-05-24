import ProductDetails from '@/src/pages/Product/ProductDetails'
import { useParams } from 'next/navigation';
import React from 'react'

export default function page({ params }: { params: { id: string } }) {
   return (
    <ProductDetails id={params.id}/>
  )
}
