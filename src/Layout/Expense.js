import React, { useState } from 'react';
import ExpenseList from './ExpenseList';
import './Expense.css';
import { useExpense } from '../Store/ExpenseContext';

const Expense = () => {
    const { expenses, addExpense, updateExpense, deleteExpense } = useExpense();
    const [showForm, setShowForm] = useState(false);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [editingExpense, setEditingExpense] = useState(null);

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingExpense) {
            handleUpdate();
        } else {
            const newExpense = {
                amount,
                description,
                category
            };
            addExpense(newExpense);
            setAmount('');
            setDescription('');
            setCategory('');
        }
        setEditingExpense(null);
        setShowForm(false);
    };

    const handleEdit = (expense) => {
        setEditingExpense(expense);
        setAmount(expense.amount);
        setDescription(expense.description);
        setCategory(expense.category);
        setShowForm(true);
    };

    const handleUpdate = async () => {
        const updatedExpense = {
            id: editingExpense.id,
            amount,
            description,
            category,
        };
        try {
            await updateExpense(updatedExpense);
            setAmount('');
            setDescription('');
            setCategory('');
        } catch (error) {
            console.error('Error updating expense:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteExpense(id);
            console.log('Expense successfully deleted');
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    const toggleForm = () => {
        setShowForm(!showForm);
        setEditingExpense(null);
        setAmount('');
        setDescription('');
        setCategory('');
    };

    return (
        <div>
            {!showForm && <button className='de-button' onClick={toggleForm}>Daily Expenses</button>}
            {showForm && (
                <div className="form-box">
                    <form className="form-container" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <label className="form-label" htmlFor="amount">Amount:</label>
                            <input
                                type="text"
                                id="amount"
                                className="form-input"
                                value={amount}
                                onChange={handleAmountChange}
                            />
                        </div>
                        <div className="form-row">
                            <label className="form-label" htmlFor="description">Description:</label>
                            <input
                                type="text"
                                id="description"
                                className="form-input"
                                value={description}
                                onChange={handleDescriptionChange}
                            />
                        </div>
                        <div className="form-row">
                            <label className="form-label" htmlFor="category">Category:</label>
                            <select id="category" className="form-select" value={category} onChange={handleCategoryChange}>
                                <option value="">Select Category</option>
                                <option value="Food">Food</option>
                                <option value="Petrol">Petrol</option>
                                <option value="Salary">Salary</option>
                            </select>
                        </div>
                        <div className="form-buttons">
                            <button className="form-button de-submit" type="submit">{editingExpense ? 'Update' : 'Submit'}</button>
                            <button className="form-button de-close" onClick={toggleForm}>Close</button>
                        </div>
                    </form>
                </div>
            )}

            <ExpenseList expenses={expenses} handleEdit={handleEdit} handleDelete={handleDelete} />
        </div>
    );
};

export default Expense;