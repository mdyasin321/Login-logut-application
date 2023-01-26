import React, { useState ,useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

import AuthContext from './components/context/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const[count,setCount]= useState(0);

  const increaseCount=(incre)=>{
      setCount(incre+1);
  }
 
  useEffect(()=>{
    const value_received=localStorage.getItem("isLoggedIn");

    if(value_received==='1'){
    
      setIsLoggedIn(true);
    }
  } , [])


  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways

    localStorage.setItem("isLoggedIn","1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setCount(0);
    setIsLoggedIn(false);
  };



  return (
    <React.Fragment>
      <AuthContext.Provider value={
        {isLoggedInOfContext : isLoggedIn ,
           onLogout:logoutHandler,
           countValue:increaseCount
          }
        }>

      {/* <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} /> */}
                              {/* OR */}
      <MainHeader />
      <main>
        {/* here I have done this so that I an see whether the data can be sent back to parent from children using context hook */}
        <h1>{count}</h1>
        {isLoggedIn===false && <Login onLogin={loginHandler} />}
        {isLoggedIn===true && <Home onLogout={logoutHandler} />}
    
      </main>
      </AuthContext.Provider>
    </React.Fragment>
  );
}

export default App;
