import { useContext,useReducer,createContext } from "react"


const initialState=null

const userReducer=(state,action)=>{

switch(action.type){
    case "SET_USER":{
return action.payload
    }

    case "REMOVE_USER":{

        return null
    }

    default:
        return state;
}

}


const UserContext=createContext()

const UserProvider=({children})=>{

    const [state,dispatch]=useReducer(userReducer,initialState)

    return (
        <UserContext.Provider value={{state,dispatch}}>
            {children}
        </UserContext.Provider>
    )
}

const useUser=()=>{
    return useContext(UserContext)
}


export {UserProvider,useUser}



