import { render, screen } from '@testing-library/react';
import { ExpenseProvider } from '../Store/Context/ExpenseContext';
import store from '../Store/Reducers/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginScreen from './LoginScreen';

test('renders Login  page  screen by default', () => {
    render(
        <Provider store={store}>
            <Router>
                <ExpenseProvider>
                    <LoginScreen />
                </ExpenseProvider>
            </Router>
        </Provider>
    );
    const ScreenElement = screen.getByText('Email:');
    expect(ScreenElement).toBeInTheDocument();
});

test('renders Login  page  screen by default', () => {
    render(
        <Provider store={store}>
            <Router>
                <ExpenseProvider>
                    <LoginScreen />
                </ExpenseProvider>
            </Router>
        </Provider>
    );
    const ScreenElement = screen.getByText('Password:');
    expect(ScreenElement).toBeInTheDocument();
});