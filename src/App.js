import React, { useState ,useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 
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
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {/* {console.log('is logged in '+ isLoggedIn + " ! = "+ !isLoggedIn)}; */}
        {isLoggedIn===false && <Login onLogin={loginHandler} />}
        {isLoggedIn===true && <Home onLogout={logoutHandler} />}
        {/* {console.log('--------- is logged in '+ isLoggedIn + " ! = "+ !isLoggedIn)}; */}
      </main>
    </React.Fragment>
  );
}

export default App;
