import React, { useState, useEffect, createContext, useContext } from 'react';

const ExpenseContext = createContext();

export const useExpense = () => useContext(ExpenseContext);

const ExpenseProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([]);

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
                    setExpenses(fetchedExpenses);
                }
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        fetchExpenses();

    }, []);

    return (
        <ExpenseContext.Provider value={{ expenses, setExpenses }}> {/* Wrapping expenses and setExpenses in an object */}
            {children}
        </ExpenseContext.Provider>
    );
};

export default ExpenseProvider;