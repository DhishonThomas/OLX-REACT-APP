import { useEffect,useRef,useState } from "react";
import Header from "./Header"
import { auth } from '../utils/firebase';
import { checkvalidateData } from "../utils/validate";
import { createUserWithEmailAndPassword,updateProfile,signInWithEmailAndPassword } from "firebase/auth";
import { useUser } from "../utils/UserContext";
import { useNavigate } from "react-router-dom";
const Login=()=>{
  const {state,dispatch}=useUser()
  const navigate=useNavigate()
    const [isSignInForm,setIsSignInForm]=useState(true)
    const [errMessage,setErrMessage]=useState('')

    const email=useRef(null)
    const password=useRef(null)
    const name=useRef(null)

console.log(email,password)


const handleButtonData=()=>{
     const errorMessage= checkvalidateData(email.current.value,password.current.value,name)
setErrMessage(errorMessage)

     if(errMessage) return

if(!isSignInForm){
 createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
    .then((userCredential) => {
      // Signed up 
      updateProfile(auth.currentUser, {
        displayName: name.current.value
      }).then(() => {

console.log("auth.currentUser",auth.currentUser)

const {uid,email,displayName}=auth.currentUser
dispatch({type:"SET_USER",payload:{

  uid,
  email,
  displayName,

}})
navigate("/")

      }).catch((error) => {
    
      navigate("/error")
      });


      const user = userCredential.user;

      console.log("user",user)
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
setErrMessage(errorCode+"_._"+errMessage)
    });
  
}else{

  signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;

    console.log(user)
    navigate("/")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrMessage(errorCode+"_._"+errMessage)
  });

}
}

   
    

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
      };

    return (  <>
        <div className="min-h-screen flex flex-col items-center justify-center   pt-16">
          <div className="bg-slate-200 shadow-md rounded-lg overflow-hidden w-full max-w-md mx-4">
            <div className="px-6 py-8">
              <h1 className="font-bold text-2xl mb-6 text-gray-800">
                {isSignInForm ? "Sign In to OLX" : "Sign Up for OLX"}
              </h1>
              <form onSubmit={(e) => { e.preventDefault(); }}>
                {!isSignInForm && (
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                      Full Name
                    </label>
                    <input
                    ref={name}
                      type="text"
                      id="fullName"
                      placeholder="Full Name"
                      className="w-full px-3 py-2 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                )}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email Address
                  </label>
                  <input
                  ref={email}
                    type="email"
                    id="email"
                    placeholder="Email Address"
                    className="w-full px-3 py-2 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <input
                  ref={password}
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="w-full px-3 py-2 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <button
                onClick={handleButtonData}
                className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-700 transition duration-200">
                  {isSignInForm ? "Sign In" : "Sign Up"}

                </button>

                <p className="font-bold text-red-500">{errMessage}</p>
              </form>
              <p className="mt-6 text-center text-gray-700">
                {isSignInForm ? "New to OLX?" : "Already have an account?"}
                <span className="text-blue-500 cursor-pointer ml-2" onClick={toggleSignInForm}>
                  {isSignInForm ? "Sign Up Now" : "Sign In"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </>

       
    )
}

export default Login