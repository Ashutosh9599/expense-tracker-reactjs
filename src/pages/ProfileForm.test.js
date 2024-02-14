import { render, screen } from '@testing-library/react';
import ProfileForm from './ProfileForm';
import { ExpenseProvider } from '../Store/Context/ExpenseContext';
import store from '../Store/Reducers/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders Profile  page  screen by default', () => {
    render(
        <Provider store={store}>
            <Router>
                <ExpenseProvider>
                    <ProfileForm />
                </ExpenseProvider>
            </Router>
        </Provider>
    );
    const ScreenElement = screen.getByText('Profile Form');
    expect(ScreenElement).toBeInTheDocument();
});