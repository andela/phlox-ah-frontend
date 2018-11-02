import React from 'react';

const LoginForm = () => (
  <div>
    <h1>Login</h1>
    <form>
      <label>Username: </label>
      <input type='text' />

      <label>Password: </label>
      <input type='password' />

      <input type='submit' name='Login'/>
    </form>
  </div>
);

export default LoginForm;
