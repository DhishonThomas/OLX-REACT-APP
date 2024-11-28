
import { collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import ProductCard from "./ProductCard";
import Banner from "./Banner";
import { Link } from "react-router-dom";


const Browse = () => {

  const [products,setProducts]=useState([])


  const fetchProducts=async ()=>{

    const productsCollection=collection(db,'products');

    const productsDocument=await getDocs(productsCollection)
    const productList=productsDocument.docs.map(doc=>({
      id:doc.id,
      ...doc.data()
    }))



setProducts(productList)

  }


  useEffect(()=>{
fetchProducts()
  },[])



  return (
    <>
    <Banner/>
    <div className="mx-64 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

{
  products.map(product=>(
   <Link to={"/singleProduct/"+product.id}> <ProductCard key={product.id} productProps={product} /></Link>
  ))
}

    </div>
  </>
  )
}

export default Browse