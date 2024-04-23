import React from 'react';
import PropTypes from 'prop-types';

const Info = ({ amount, category, id, date, deleteCard }) => {
  const handleDelete = () => {
    deleteCard(id);
  };

  return (
    <div className="col m6 s12">
      <div className="card">
        <div className="card-content">
          <span className="card-title" data-test="amount">
            Amount: ${amount}
          </span>
          <div className="card-data">
            <span data-test="category">Category: {category}</span>
            <span data-test="date">Date: {date}</span>
          </div>

          <button className="delete-btn" onClick={handleDelete}>
            X
          </button>
        </div>
      </div>
    </div>
  );
};

Info.propTypes = {
  amount: PropTypes.string,
  category: PropTypes.string,
  id: PropTypes.string,
  date: PropTypes.string,
  deleteCard: PropTypes.func
};

export default Info;