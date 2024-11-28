import { useContext,useReducer,createContext } from "react"


const initialState=null

const productReducer=(state,action)=>{

switch(action.type){
    case "ADD-PRODUCT":{
return action.payload
    }

    default:
        return state;
}

}


const ProductContext=createContext()

const ProductProvider=({children})=>{

    const [state,dispatch]=useReducer(productReducer,initialState)

    return (
        <ProductContext.Provider value={{state,dispatch}}>
            {children}
        </ProductContext.Provider>
    )
}

const useProduct=()=>{
    return useContext(ProductContext)
}


export {ProductProvider,useProduct}


