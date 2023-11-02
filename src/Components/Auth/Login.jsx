import React, { useContext, useState } from 'react';
import {When} from 'react-if';

import { LoginContext } from '../../Context/auth/Context';

const Login = () => {
  const context = useContext(LoginContext);
  const [state, setState] = useState({ username: '', password: '' });

  const handleChange = e => {
    setState(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    console.log(state);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Submitting form');
    context.login(state.username, state.password);
  };

  return (
    <>
      <When condition={context.loggedIn}>
        <button onClick={context.logout}>Log Out</button>
      </When>

      <When condition={!context.loggedIn}>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="UserName"
            name="username"
            onChange={handleChange}
          />
          <input
            placeholder="password"
            type="password"
            onChange={handleChange}
          />
          <button>Login</button>
        </form>
      </When>
    </>
  );
}

export default Login;