import React from 'react'
import { useParams } from 'react-router-dom'
import { collection,getDocs } from 'firebase/firestore'
import { db, } from '../utils/firebase'
import { useState,useEffect } from 'react'
import Banner from './Banner'

const SingleProduct = () => {

    const {proId}=useParams()

console.log("proId",proId)

const [product,setProduct]=useState([])


const fetchProducts=async ()=>{

  const productsCollection=collection(db,'products');

  const productsDocument=await getDocs(productsCollection)
  const productList=productsDocument.docs.map(doc=>({
    id:doc.id,
    ...doc.data()
  }))
  const singleProduct=productList.filter((product)=>(
    product.id === proId
))
setProduct(singleProduct)

}


useEffect(()=>{
fetchProducts()
},[proId])


if (product.length===0) return <div>Loading...</div>;



  return (<>
    <Banner/>
<hr></hr>
    <div className="max-w-full max-h-max mt-10 p-6 bg-white shadow-xl  rounded-lg">
    <div
    className="absolute top-0 left-0 w-full h-12 rounded-t-lg"
    style={{
      background: "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))"
    }}
  />
    <div className="flex flex-col lg:flex-row">
      <div className="lg:w-full lg:h-full border-opacity-90 bg-black">
        <img 
          src={product[0].imageUrl} 
          alt={product[0].productName} 
          className="w-full h-[700px] object-fill rounded-lg"
        />
      </div>
      <div className="lg:w-1/3 lg:ml-6 mt-6 lg:mt-0 flex flex-col justify-between">
        <div className='border-gray-400 border-opacity-75  items-center' style={{backgroundColor:"#fffff1"}}>
          <p className="text-6xl text-black-700 font-sans mb-4 text-center">₹{product[0].price}</p>
          <p className="text-pretty mb-4 text-center">{product[0].productName}</p>
  
         
        </div>
        <button className="mt-6  px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition duration-300">
            Contact Seller
          </button>
      </div>
    </div>
    <div className='border-opacity-100 mt-9 mx-10'>
      <hr />
      <h2 className='font-bold text-3xl mt-5'>Description</h2>
      <p className="text-lg text-gray-700 mb-4">{product[0].description}</p>
    </div>
  </div>
  </>
  )
}

export default SingleProduct