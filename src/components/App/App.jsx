import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';
import ExpenseForm from '../ExpenseForm/ExpenseForm';
import Info from '../Info/Info';
import Bar from '../Bar/Bar';
import { getData, storeData } from '../../helpers/localStorage';

const App = () => {
  const initialState = () => getData('expenses') || [];
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  useEffect(() => {
    storeData('expenses', state);
    const date = state.map(obj => obj.date);
    const amount = state.map(obj => obj.amount);
    let newData = { date, amount };
    setData(newData);
  }, [state]);

  const handleChange = val => {
    const { date, category, amount } = val;
    val.id = uuidv4();
    let newVal = [...state, val];
    let len = newVal.length;
    if (len > 30) newVal = newVal.slice(1, len);
    setState(newVal);
  };

  const handleDelete = id => {
    storeData('lastState', state);
    let newState = state.filter(i => {
      return i.id !== id;
    });
    setState(newState);
  };

  const handleUndo = () => {
    setState(getData('lastState'));
  };

  return (
    <div className='container'>
      <div className='row center'>
        <h1 className='white-text'> Daily Spending Tracker </h1>
      </div>
      <div className='row'>
        <div className='col m12 s12'>
          <ExpenseForm change={handleChange} />
          <Bar labelData={data.date} amountData={data.amount} />
          <div>
            <div className='row center'>
              <h4 className='white-text'>30 Day Data</h4>
            </div>
            <div className='data-container row'>
              {state.length > 0 ? (
                <>
                  {state.map(info => (
                    <Info
                      key={info.id}
                      id={info.id}
                      date={info.date}
                      category={info.category}
                      amount={info.amount}
                      deleteCard={handleDelete}
                    />
                  ))}
                </>
              ) : (
                  <div className='center white-text'>No log found</div>
                )}
            </div>
          </div>
          {getData('lastState') !== null ? (
            <div className='center'>
              <button className='calculate-btn' onClick={handleUndo}>
                Undo
              </button>
            </div>
          ) : (
              ''
            )}
        </div>
      </div>
    </div>
  );
};

export default App;