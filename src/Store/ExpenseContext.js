import React, { createContext, useContext, useEffect, useReducer } from 'react';
import expensesReducer from '../Reducers/expensesReducer';
const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
    const [expensesState, expensesDispatch] = useReducer(expensesReducer, {
        expenses: [],
    });

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await fetch('https://expense-tracker-3c382-default-rtdb.firebaseio.com/expense.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch expenses');
                }
                const data = await response.json();
                if (data) {
                    const fetchedExpenses = Object.keys(data).map(key => ({
                        id: key,
                        ...data[key]
                    }));
                    expensesDispatch({ type: 'setExpenses', payload: fetchedExpenses });
                }
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        fetchExpenses();
    }, []);

    const addExpense = async (newExpense) => {
        try {
            const response = await fetch('https://expense-tracker-3c382-default-rtdb.firebaseio.com/expense.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newExpense),
            });
            if (!response.ok) {
                throw new Error('Failed to add expense');
            }
            const data = await response.json();
            expensesDispatch({ type: 'addExpense', payload: { id: data.name, ...newExpense } });
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    const deleteExpense = async (id) => {
        try {
            const response = await fetch(`https://expense-tracker-3c382-default-rtdb.firebaseio.com/expense/${id}.json`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete expense');
            }
            expensesDispatch({ type: 'deleteExpense', payload: id });
        } catch (error) {
            console.error('Error deleting expense:', error);
            throw error;
        }
    };

    const updateExpense = async (updatedExpense) => {
        try {
            const response = await fetch(`https://expense-tracker-3c382-default-rtdb.firebaseio.com/expense/${updatedExpense.id}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedExpense),
            });
            if (!response.ok) {
                throw new Error('Failed to update expense');
            }
            expensesDispatch({ type: 'updateExpense', payload: updatedExpense });
        } catch (error) {
            console.error('Error updating expense:', error);
            throw error;
        }
    };

    const contextValue = {
        expensesState,
        addExpense,
        deleteExpense,
        updateExpense,
    };

    return (
        <ExpenseContext.Provider value={contextValue}>
            {children}
        </ExpenseContext.Provider>
    );
};

export const useExpense = () => useContext(ExpenseContext);