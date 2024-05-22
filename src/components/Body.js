import React, { useEffect } from 'react'
import { createBrowserRouter,Outlet,RouterProvider } from 'react-router-dom'
import Login from './Login'
import Browse from './Browse'
import { useUser } from '../utils/UserContext'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../utils/firebase'
import Product from './Product'
import Header from './Header'
import Footer from './Footer'
import SingleProduct from './SingleProduct'
import RedirectOnAuth from '../utils/redirectOnAuth'
const Body = () => {
  
const {state,dispatch}=useUser()


const Applayout=()=>{

return (<>
<Header/>
  <Outlet/>
  <Footer/>
</>
  
)

}


const appRouter=createBrowserRouter([

  {
    path:"/",
    element:<Applayout/>,
    children:[
      {
        path:"/",
        element:<Browse/>
      },
    
      {
        path:"/login",
        element: <RedirectOnAuth><Login/></RedirectOnAuth> 
      },
      {
        path:"/addProduct",
        element:<Product/>
      },
      {
        path:"/singleProduct/:proId",
        element:<SingleProduct/>
      }
    ]
  },
]
)
  

useEffect(()=>{
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const {uid,email,displayName}=user
     dispatch({type:"SET_USER",payload:{
    uid,  
    email,
    displayName
     }})
    } else {
  
dispatch({type:"REMOVE_USER"})

    }
  });
  
},[])
    return (
    <div>

      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body