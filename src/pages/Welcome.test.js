import { render, screen } from '@testing-library/react';
import Welcome from './Welcome';
import { ExpenseProvider } from '../Store/Context/ExpenseContext';
import store from '../Store/Reducers/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders Welcome page  screen by default', () => {
    render(
        <Provider store={store}>
            <Router>
                <ExpenseProvider>
                    <Welcome />
                </ExpenseProvider>
            </Router>
        </Provider>
    );
    const loginScreenElement = screen.getByText('Welcome to Expense Tracker');
    expect(loginScreenElement).toBeInTheDocument();
});