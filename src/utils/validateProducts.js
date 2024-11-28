
const checkvalidateProductData=(productName,
    price,
    description,
    image)=>{


const productNameValidate=/^[a-zA-Z' -]{2,30}$/.test(productName)
const priceValidate= /^\d+(\.\d+)?$/.test(price)
const descriptionValidate=/^[a-zA-Z' -]{2,100}$/.test(description)
const imageValidate=/\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(image)

if(!productNameValidate)return "Product Name is no valid"

if(!priceValidate)return "Price is not valid"

if(!descriptionValidate)return "Description is not valid"

if(!imageValidate)return "Image is not valid"

}

export default checkvalidateProductData