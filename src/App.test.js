import { render, screen } from '@testing-library/react';
import App from './App';
import store from './Store/Reducers/store';
import { Provider } from 'react-redux';

test('renders login screen by default', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const loginScreenElement = screen.getByText('Email:');
  expect(loginScreenElement).toBeInTheDocument();
});

test('renders signup page when navigating to /signup', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const signupPageElement = screen.getByText('Password:');
  expect(signupPageElement).toBeInTheDocument();
});

test('renders forgot password page when navigating to /forgot-password', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const forgotPasswordElement = screen.getByText('Forgot Password?');
  expect(forgotPasswordElement).toBeInTheDocument();
});

test('renders welcome page after successful login', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const welcomePageElement = screen.getByText('Expense Tracker');
  expect(welcomePageElement).toBeInTheDocument();
});