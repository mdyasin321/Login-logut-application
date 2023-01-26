import React, { useState , useEffect,useReducer} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer=(prevState,action)=>{
  if(action.type==='UserInput'){
    return {value:action.val , isValid:action.val.includes('@')}
  }
  if(action.type==='UserBlur'){
    return {value:prevState.value , isValid:prevState.value.includes('@')}
  }
  return {value:'',isValid:false}
}

const passwordReducer=(prevState,action)=>{
  if(action.type==='UserInput'){
    return {value:action.val , isValid:action.val.trim().length > 6}
  }
  if(action.type==='UserBlur'){
    return {value:prevState.value , isValid:prevState.value.trim().length > 6}
  }
  return {value:'',isValid:false}
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  
  //useReducer() hook :- It is the combination of enteredEmail state and emailIsValid state
  const [emailState,dispatchEmail]= useReducer(emailReducer,{value:'',isValid:null})

 //useReducer() hook :- It is the combination of enteredPassword state and passwordIsValid state
  const [passwordState,dispatchPass]= useReducer(passwordReducer,{value:'',isValid:null})


  useEffect(()=>{
  

    const identifier=setTimeout(()=>{
      console.log("checking validity");
      setFormIsValid(
      
        emailState.isValid && passwordState.isValid
  
      );

    },3000)

    return ()=>{
      clearTimeout(identifier);
    }
 

  },[emailState,passwordState])

  // here first time the function inside the useEffect will execute, but after that if only the dependencies(enteredEmail, enteredPassword)
  // either of both of them changes, then the fuction will execute once again

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
                //OR(Using useReducer hook)
    dispatchEmail({type:'UserInput', val:event.target.value})


    // setFormIsValid(
    //   event.target.value.includes('@') && enteredPassword.trim().length > 6

    // );
                        //OR(Using useReducer hook)
    // setFormIsValid(
    //   emailState.isValid && passwordState.isValid

    // ); 
    //But I will not use setFormIs Valid here, because it may happen that passwordState or emailState is of old state , so
   // we will use useEffect hook.
                

   
  };

  const passwordChangeHandler = (event) => {
   // setEnteredPassword(event.target.value);
   dispatchPass({type:'UserInput', val:event.target.value})

    // setFormIsValid(
    //   event.target.value.trim().length > 6 && enteredEmail.includes('@')
    // );           

                       //OR(Using useReducer hook)

   setFormIsValid(
       passwordState.isValid && emailState.isValid
     );                   
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));

                 //OR(Using useReducer hook)

    dispatchEmail({type:'UserBlur'})

   
  };

  const validatePasswordHandler = () => {
    //setPasswordIsValid(enteredPassword.trim().length > 6);

    dispatchPass({type:'UserBlur'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
