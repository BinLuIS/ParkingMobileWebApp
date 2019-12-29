import React from 'react';
import { Toast } from 'antd-mobile';
import {
    Route,
    Redirect
  } from "react-router-dom";
  
  
const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        {
          if(authenticated){
            return <Component {...rest} {...props} />
          }else{
            Toast.fail('Insufficient Permission. Please login first.', 3);
            return <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />}
        }
      }
    />
);
  
export default PrivateRoute