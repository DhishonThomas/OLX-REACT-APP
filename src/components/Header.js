import React, { useEffect } from 'react';
import OlxLogo from '../assets/OlxLogo';
import Search from '../assets/Search';
import Arrow from '../assets/Arrow';
import SellButton from '../assets/SellButton';
import SellButtonPlus from '../assets/SellButtonPlus';
import { Link } from "react-router-dom";
import { useUser } from '../utils/UserContext';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Product from './Product';


const Header=()=>{

  const navigate=useNavigate()

const {state:user}=useUser()
console.log(user)
const handleSignOut=()=>{
  signOut(auth).then(() => {

navigate("/")
  }).catch((error) => {
navigate("/error")
  });
}


const handleSellButton=()=>{
if(user){

navigate("/addProduct")

}else {
  Swal.fire({
    title: 'Login Required',
    text: 'You need to log in first to sell a product.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Login Now',
  }).then((result) => {
    if (result.isConfirmed) {
      navigate('/login');
    }
  });
}
}

  return (
<div className="p-2 bg-gray-100 sticky w-full z-50 ">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center">
          
          <Link to={'/'} >   <OlxLogo /> </Link>
        
        </div>
        <div className="hidden lg:flex items-center h-12 border-2 border-[#002f34] rounded-md bg-white px-2 w-64">
          <Search />
          <input className="w-44 border-none outline-none" type="text" placeholder="Search city" />
          <Arrow className="ml-2" />
        </div>
        <div className="hidden md:flex items-center h-12 border-2 border-[#002f34] rounded-md bg-white w-96">
          <input
            className="flex-grow border-none outline-none px-2"
            type="text"
            placeholder="Find car, mobile phone, and more..."
          />
          <div className="w-12 h-12 flex items-center justify-center bg-[#002f34] rounded-r-md cursor-pointer">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="flex items-center h-12">
          <span className="text-lg font-bold mr-1">ENGLISH</span>
          <Arrow className="ml-2" />
        </div>
        {user&&
     <div className="flex items-center">
        <p>{user.displayName}</p>
     <Link to={"/"} ><span onClick={handleSignOut} className="font-bold cursor-pointer text-red-600 pl-11">Sign Out</span></Link>
     
   </div>
        }
             {!user&&
     <div className="flex items-center">
        
     <Link to={"/login"} ><span className="font-bold cursor-pointer">Login</span></Link>
     
   </div>
        }
   
   <div className="overflow-hidden pr-28">
  
    <button 
    onClick={handleSellButton}
    className="relative px-6 py-2 font-bold text-white bg-slate-500 rounded-full">
    <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500" />
    <span className="relative">Sell</span>
  </button>

</div>


      </div>
    </div>
  );
}

export default Header;
