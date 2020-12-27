import React,{ createContext, useReducer } from 'react';
export const AuthContext = createContext();
const authReducer = (state,action)=>{
    switch (action.type) {
        case 'login':{
            const name = action.payload.name;
            const uerInfo ={
                authenticated:true,
                name:action.payload.name,
                family:action.payload.family,
                meliCode:action.payload.meliCode,
                userImg:action.payload.userImg,
            };
            localStorage.setItem('user',JSON.stringify(uerInfo))
            localStorage.setItem('name',JSON.stringify(name))
            return{authenticated:true}
        }
        case 'logout':
        {
            localStorage.removeItem('user');
            return{authenticated:false}
            break;
        }
        default:
            return state;
    }
}
const AuthContextProvider=(props)=>{
    const[authenticated,dispatch] = useReducer(authReducer,false);
    return(
        <AuthContext.Provider value={{authenticated,dispatch}}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider;