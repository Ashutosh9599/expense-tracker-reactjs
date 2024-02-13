import { render, screen } from '@testing-library/react';
import { ExpenseProvider } from '../Store/Context/ExpenseContext';
import store from '../Store/Reducers/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Expense from './Expense';

test('renders Expense by default', () => {
    render(
        <Provider store={store}>
            <Router>
                <ExpenseProvider>
                    <Expense />
                </ExpenseProvider>
            </Router>
        </Provider>
    );
    const loginScreenElement = screen.getByText('Daily Expenses');
    expect(loginScreenElement).toBeInTheDocument();
});