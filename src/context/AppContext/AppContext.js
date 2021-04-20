import React,{ createContext, useReducer } from 'react';
export const PostsContext = createContext();
const authReducer = (state,action)=>{
    switch (action.type) {
        case 'posts':{
            localStorage.setItem('posts',JSON.stringify(action.payload.posts));
        }
        default:
            return state;
    }
}
const AuthContextProvider=(props)=>{
    const[authenticated,dispatch] = useReducer(authReducer,false);
    return(
        <PostsContext.Provider value={{authenticated,dispatch}}>
            {props.children}
        </PostsContext.Provider>
    )
}
export default AuthContextProvider;