import { render, screen } from '@testing-library/react';
import { AuthProvider } from '../Store/Context/auth-context';
import store from '../Store/Reducers/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';

test('renders Header by default', () => {
    render(
        <Provider store={store}>
            <Router>
                <AuthProvider>
                    <Header />
                </AuthProvider>
            </Router>
        </Provider>
    );
    const loginScreenElement = screen.getByText('Expense Tracker');
    expect(loginScreenElement).toBeInTheDocument();
});