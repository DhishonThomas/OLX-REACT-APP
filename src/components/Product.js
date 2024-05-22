import React, { useRef, useState } from "react";
import Swal from "sweetalert2"; 
import checkvalidateProductData from "../utils/validateProducts";
import { storage, db } from "../utils/firebase"
import { ref,getDownloadURL, uploadBytes } from "firebase/storage";
import { useUser } from "../utils/UserContext";
import { collection,addDoc } from "firebase/firestore";



const Product = () => {
  const {state,dispatch}=useUser()

const [errMessage,setErrMessage]=useState("")
const [uploading,setUploading]=useState(false)
const [imagePreview,setImagePreview]=useState(null)

  const productName = useRef(null);
  const price = useRef(null);
  const description = useRef(null);
  const image = useRef(null);

const handleImage=(e)=>{
  const file = e.target.files[0]
  if(file){
    setImagePreview(URL.createObjectURL(file))
  }
}

  const handleSubmit = async(e) => {
    e.preventDefault();
setUploading(true)

    console.log("price",price)
    const imageName=image.current.files[0].name

    const errorMessage = checkvalidateProductData(
      productName.current.value,
      price.current.value,
      description.current.value,
      imageName
    );

setErrMessage(errorMessage)

if(errorMessage) return setUploading(false)


if(!errorMessage){

const file=image.current.files[0]

const storageRef=ref(storage,`images/${file.name}`)

let imageUrl=""
  try{
await uploadBytes(storageRef,file)
 imageUrl=await getDownloadURL(storageRef)

console.log(imageUrl)
console.log(state)
const productData={
  productName:productName.current.value,
  price:price.current.value,
  description:description.current.value,
  imageUrl,
  userId:state.uid,
  createdAt:new Date(),
}

await addDoc(collection(db,"products"),productData)

setUploading(false)

Swal.fire({
  title: 'Product Added Successfully',
  text: 'Your product has been added successfully!',
  icon: 'success',
  timer: 3000, 
  showConfirmButton: false,
});
productName.current.value=""
price.current.value=""
description.current.value = ""
image.current.value = ""

  }catch(error){

console.error("Error uploding the image",error)
setUploading(false)
setErrMessage("Error uploading image.Please try again")
  }
}

};
  return (
    <>
      <div className="secondDiv mt-10">
        <form
          id="add-product-form"
          className="max-w-lg mx-auto  bg-slate-300 p-8    shadow-md rounded-lg"
        >
          <h2 className="text-xl font-semibold mb-6">Add New Product</h2>
          <div className="mb-4">
            <label htmlFor="productName" className="block text-gray-700 mb-2">
              Product Name
            </label>
            <input
              ref={productName}
              type="text"
              id="productName"
              name="productName"
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 mb-2">
              Price
            </label>
            <input
              ref={price}
              type="number"
              id="price"
              name="price"
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 mb-2">
              Description
            </label>
            <textarea
              ref={description}
              id="description"
              name="description"
              rows="4"
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            ></textarea>
          </div>
          <div className="mb-6">
            <label htmlFor="image" className="block text-gray-700 mb-2">
              Image
            </label>
            <input
              ref={image}
              onChange={handleImage}
              type="file"
              id="image"
              name="image"
              accept="image/*"
              required
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-2"
            />
          </div>

          {imagePreview && (
              <div className="mt-4">
                <img src={imagePreview} alt="Preview" className="max-w-full h-auto rounded-lg" />
              </div>
            )}
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full mt-8 bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
          >
            {uploading?"Uploading.....":"Add Product"}
          </button>

          <p className="text-red-600 font-bold pt-5">{errMessage}</p>
        </form>
      </div>
    </>
  );
};

export default Product;
