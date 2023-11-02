import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';
import { LoginContext } from '../__mocks__/Context/auth/Context';

jest.mock('../../Context/auth/Context');

describe('Login Component', () => {

  it('shows login form when not logged in', () => {
    const { getByPlaceholderText } = render(
      <LoginContext.Provider value={LoginContext}>
        <Login />
      </LoginContext.Provider>
    );

    expect(getByPlaceholderText('UserName')).toBeInTheDocument();
    expect(getByPlaceholderText('password')).toBeInTheDocument();
  });

  it('shows logout button when logged in', () => {
    LoginContext.loggedIn = true;
    const { getByText } = render(
      <LoginContext.Provider value={LoginContext}>
        <Login />
      </LoginContext.Provider>
    );

    expect(getByText('Log Out')).toBeInTheDocument();
  });

  it('calls login method with username and password on form submit', () => {
    const { getByPlaceholderText, getByText } = render(
      <LoginContext.Provider value={LoginContext}>
        <Login />
      </LoginContext.Provider>
    );

    userEvent.type(getByPlaceholderText('UserName'), 'testuser');
    userEvent.type(getByPlaceholderText('password'), 'testpassword');
    fireEvent.click(getByText('Login'));

    expect(LoginContext.login).toHaveBeenCalledWith('testuser', 'testpassword');
  });

  it('calls logout method when logged in and logout button is clicked', () => {
    LoginContext.loggedIn = true;
    const { getByText } = render(
      <LoginContext.Provider value={LoginContext}>
        <Login />
      </LoginContext.Provider>
    );

    fireEvent.click(getByText('Log Out'));

    expect(LoginContext.logout).toHaveBeenCalled();
  });
});
