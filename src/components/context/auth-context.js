import React from 'react';

//here the AuthContext can contain anything like it maybe null, or it may be any string or object 
// here we have given default values to AuthContext which we are using in AuthContext.provider i.e
//Suppose you have passed the deleteHandler function in the AuthContext.provider then here(auth-context file) also give te deleteHandler dummy functiom,as
// i have done for the case of onLogout handler
const AuthContext=React.createContext({
    isLoggedInOfContext : null ,
           onLogout:()=>{},
           countValue:0
});

export default AuthContext;

