import React, { useState } from 'react';
import './AddUserForm.css';

const AddUserForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-popup-overlay">
      <div className="form-popup">
        <h2>Add New User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Department:</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;
