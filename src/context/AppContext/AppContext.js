import React,{ createContext, useReducer } from 'react';
export const AppContext = createContext();
const authReducer = (state,action)=>{
    switch (action.type) {
        case 'posts':{
            localStorage.setItem('posts',JSON.stringify(action.payload.posts));
        }
        case 'users':{
            localStorage.setItem('users',JSON.stringify(action.payload.users));
        }
        case 'comments':{
            localStorage.setItem('comments',JSON.stringify(action.payload.comments));
        }
        default:
            return state;
    }
}
const AuthContextProvider=(props)=>{
    const[authenticated,dispatch] = useReducer(authReducer,false);
    return(
        <AppContext.Provider value={{authenticated,dispatch}}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AuthContextProvider;