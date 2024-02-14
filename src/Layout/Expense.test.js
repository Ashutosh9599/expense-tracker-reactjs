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
    const ScreenElement = screen.getByText('Daily Expenses');
    expect(ScreenElement).toBeInTheDocument();
});

test('renders Expense List by default', () => {
    render(
        <Provider store={store}>
            <Router>
                <ExpenseProvider>
                    <Expense />
                </ExpenseProvider>
            </Router>
        </Provider>
    );
    const ScreenElement = screen.getByText('Expense List');
    expect(ScreenElement).toBeInTheDocument();
});