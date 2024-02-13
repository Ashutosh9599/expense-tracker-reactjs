import { render, screen } from '@testing-library/react';
import App from './App';
import ForgotPassword from './Auth/ForgotPassword';
import store from './Store/Reducers/store';
import { Provider } from 'react-redux';

test('renders starts by default', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const loginScreenElement = screen.getByText('Expense Tracker');
  expect(loginScreenElement).toBeInTheDocument();
});

