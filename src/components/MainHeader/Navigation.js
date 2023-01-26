import React , {useContext} from 'react';
import AuthContext from '../context/auth-context';

import classes from './Navigation.module.css';

const Navigation = (props) => {

  // here the useContext is pointing to the AuthContext and the useContext will return the object
  const ctx= useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>

        {/* {props.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )} */}
                {/* OR */}
        {ctx.isLoggedInOfContext && (
          <li>
            <a href="/">Users</a>
          </li>
        )}

{/*         
        {props.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )} */}

            {/* OR */}
        
        {ctx.isLoggedInOfContext && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.isLoggedInOfContext && (
          <li>
            <button onClick={ctx.onLogout}>Logout</button>
          </li>
        )}
        {ctx.isLoggedInOfContext && (
          <li>
            <button onClick={()=>{ctx.countValue(7)}}>Increase</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
