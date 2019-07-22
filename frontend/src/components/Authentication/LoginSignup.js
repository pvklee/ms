import React, {useState, memo, useContext, useEffect} from 'react';
import Context from '../../containers/Context';
import equalityCheck from '../../util/equalityCheck';
import axios from 'axios';
import {Helmet} from 'react-helmet';
import {Input, Button} from 'antd';

const LoginSignup = memo(({type}) => {
  const path = (type === 'Login') ? '/users/login' : '/users/signup';
  
  const {
    setLogin
  } = useContext(Context);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const authHandler = async (e) => {
    e.preventDefault();
    let userData;
    try{
      userData = await axios.post(path, {email, password});
    } catch (err) {
      debugger;
      return errorHandler(err.response.data);
    }
    const token = userData.data.token;
    const tempEmail = email;
    setErrors({});
    setEmail('');
    setPassword('');
    setLogin(tempEmail, token);
  }

  const errorHandler = (errs) => {
    setErrors(errs);
  }

  return(
    <div className="login">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{type}</title>
      </Helmet>
      <form>
        <label>Email
          <Input
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {errors.email ? errors.email : null}
        </label><br/>
        <label>Password
          <Input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {errors.password ? errors.password : null}
        </label><br/>
        <Button type="submit" onClick={authHandler}>{type}</Button>
      </form>
    </div>
  )
}, equalityCheck);

export const Login = (props) => <LoginSignup type='Login'/>;
export const Signup = (props) => <LoginSignup type='Signup'/>;


