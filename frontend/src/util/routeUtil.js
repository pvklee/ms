import React, {useContext} from 'react'
import {Route, Redirect, withRouter} from 'react-router-dom'
import Context from '../containers/Context';

const Auth = ({component: Component, path, exact}) => {
  const {currentUser} = useContext(Context);
  return(
    <Route path={path} exact={exact} render={(props) => (
      !currentUser ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    )} />
  )
};

const Protected = ({component: Component, path, exact}) => {
  const {currentUser} = useContext(Context);
  return(
    <Route path={path} exact={exact} render={(props) => (
      !currentUser ? (
        <Redirect to="/login" /> 
      ) : (
        <Component {...props} />
      )
    )} />
  )
};

export const AuthRoute = withRouter(Auth);
export const ProtectedRoute = withRouter(Protected);
