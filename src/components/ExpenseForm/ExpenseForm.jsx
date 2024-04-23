import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../App/App.css';

const initialValues = {
	amount: '',
	categories: ['Food', 'Entertainment', 'Transportation'].map(cat => ({
		name: cat,
		value: ''
	})),
	date: ''
}

const ExpenseForm = ({ change }) => {
	const [state, setState] = useState(initialValues);

	const handleChange = e => {
		let { name, value } = e.target;
		if (e.target.type === 'number') {
			value = Math.max(0, Math.min(999, parseInt(value, 10)));
		}
		const date = new Date().toLocaleString().split(',')[0];
		setState({
			...state,
			[name]: value,
			date
		});
	};

	const handleCategoryChange = (index, e) => {
		const { name, value } = e.target;
		setState({
			...state,
			categories: state.categories.map((cat, i) =>
				i === index ? { ...cat, [name]: value } : cat
			)
		});
	};

	const handleSubmit = () => {
		const { amount, categories, date } = state;
		change({ amount, categories, date });
		setState(initialValues);
	};

	return (
		<>
			<div className="row">
				<div className="col m6 s12">
					<label htmlFor="amount">Amount (in USD)</label>
					<input
						id="amount"
						name="amount"
						type="number"
						min="0"
						max="999"
						placeholder="50"
						value={state.amount}
						onChange={handleChange}
					/>
				</div>

				{state.categories.map((cat, index) => (
					<div className="col m6 s12" key={index}>
						<label htmlFor={`category-${index}`}>
							{cat.name} ({cat.value || '0'})
						</label>
						<input
							id={`category-${index}`}
							name="value"
							type="number"
							min="0"
							max="999"
							placeholder="0"
							value={cat.value || ''}
							onChange={e => handleCategoryChange(index, e)}
						/>
					</div>
				))}
			</div>
			<div className="center">
				<button
					id="financial-btn"
					className="calculate-btn"
					type="button"
					disabled={state.amount === '' || state.categories.some(cat => cat.value === '')}
					onClick={handleSubmit}
				>
					Add Expense
				</button>
			</div>
		</>
	);
};

FinancialForm.propTypes = {
	change: PropTypes.func.isRequired
};

export default ExpenseForm;