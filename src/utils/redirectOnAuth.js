import { useUser } from "./UserContext"
import { Navigate } from "react-router-dom"
const RedirectOnAuth=({children})=>{
    const {state,dispatch}=useUser()

    if(state){

        console.log("state",state)
       return <Navigate to={"/"}/>
    }
    return children
}

export default RedirectOnAuth