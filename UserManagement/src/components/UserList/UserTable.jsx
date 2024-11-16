import React from 'react';
import Pagination from '../Pagination/Pagination.jsx';
import './UserTable.css';

const UserTable = ({ users, onEdit, onDelete, currentPage, totalPages, onPageChange }) => (
  <div className="table-wrapper">
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.department || 'NA'}</td>
              <td className="actions">
                <button className="edit-btn" onClick={() => onEdit(user)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => onDelete(user)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Pagination 
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
    />
  </div>
);

export default UserTable;