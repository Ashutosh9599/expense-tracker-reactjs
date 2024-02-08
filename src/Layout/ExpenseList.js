import React from 'react';
import './ExpenseList.css'; 

const ExpenseList = ({ expenses }) => {
    if (!expenses || expenses.length === 0) {
        return <p>No expenses</p>;
    }

    return (
        <div className="expense-list-container"> 
            <h2>Expense List</h2>
            <table className="expense-table"> 
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense, index) => (
                        <tr key={index}>
                            <td>{expense.amount}</td>
                            <td>{expense.description}</td>
                            <td>{expense.category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExpenseList;