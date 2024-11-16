import React from 'react';
import './DeletePopup.css';

const DeletePopup = ({ user, onConfirm, onCancel }) => (
  <div className="delete-popup-overlay">
    <div className="delete-popup">
      <h3>Confirm Delete</h3>
      <p>Are you sure you want to delete {user.firstName} {user.lastName}?</p>
      <div className="delete-popup-actions">
        <button className="cancel-btn" onClick={onCancel}>Cancel</button>
        <button className="confirm-btn" onClick={onConfirm}>Delete</button>
      </div>
    </div>
  </div>
);

export default DeletePopup;