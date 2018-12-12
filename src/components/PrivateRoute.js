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
            console.log("go to component")
            return <Component {...rest} {...props} />
          }else{
            Toast.info('沒有權限進入頁面，請先登入', 3);
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