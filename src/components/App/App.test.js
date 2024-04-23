import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('renders', () => {
    expect(wrapper).not.toBeNull();
  });

  it('should have a form for adding expenses', () => {
    expect(wrapper.find('ExpenseForm')).toHaveLength(1);
  });

  it('should display the last 30 days of expenses', () => {
    const data = [
      { date: '2023-01-01', category: 'Food', amount: 10 },
      { date: '2023-01-02', category: 'Entertainment', amount: 20 },
      // Add more expense data for the last 30 days
    ];
    localStorage.setItem('expenses', JSON.stringify(data));
    wrapper.update();
    expect(wrapper.find('Info')).toHaveLength(data.length);
  });

  it('should handle adding a new expense', () => {
    const newExpense = { date: '2023-01-03', category: 'Clothing', amount: 30 };
    const handleChange = jest.fn();
    wrapper.find('ExpenseForm').prop('change')(newExpense);
    expect(handleChange).toHaveBeenCalledWith(newExpense);
    expect(wrapper.find('Info')).toHaveLength(1);
  });

  it('should handle deleting an expense', () => {
    const handleDelete = jest.fn();
    const expenseToDelete = { id: '1', date: '2023-01-01', category: 'Food', amount: 10 };
    wrapper.find('Info').prop('deleteCard')(expenseToDelete.id);
    expect(handleDelete).toHaveBeenCalledWith(expenseToDelete.id);
  });

  it('should handle undoing the last deletion', () => {
    const handleUndo = jest.fn();
    wrapper.find('button.calculate-btn').simulate('click');
    expect(handleUndo).toHaveBeenCalled();
  });
});