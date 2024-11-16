import React, { useState, useEffect } from 'react';
import UserTable from './components/UserList/UserTable.jsx';
import DeletePopup from './components/Delete/DeletePopup.jsx';
import AddUserForm from './components/UserForm/AddUserForm.jsx';
import EditFormPopup from './components/Edit/EditFormPopup.jsx';
import ErrorMessage from './components/ErrorMessage/ErrorMessage.jsx';
import { fetchUsers, addUser, updateUser, deleteUser } from './Services/api.js';
import './App.css';

const App = () => {
  // State management
  const [users, setUsers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 5;

  // Load users on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      const transformedData = data.map(user => ({
        id: user.id,
        firstName: user.name.split(' ')[0],
        lastName: user.name.split(' ')[1] || '',
        email: user.email,
        department: user.company?.name || 'NA'
      }));
      setUsers(transformedData);
      setTotalPages(Math.ceil(transformedData.length / ITEMS_PER_PAGE));
    } catch (err) {
      setError('Failed to load users. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentPageUsers = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return users.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddUser = async (userData) => {
    try {
      setLoading(true);
      const response = await addUser(userData);
      // Update local state with the new user
      setUsers(prevUsers => [...prevUsers, {
        ...userData,
        id: response.id
      }]);
      setShowAddForm(false);
      setError(null);
    } catch (err) {
      setError('Failed to add user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = async (id, userData) => {
    try {
      setLoading(true);
      await updateUser(id, userData);
      // Update local state immediately after successful API call
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === id 
            ? { ...userData, id } // Update the user data while preserving the ID
            : user // Keep other users unchanged
        )
      );
      setShowEditForm(false);
      setSelectedUser(null);
      setError(null);
    } catch (err) {
      setError('Failed to update user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    
    try {
      setLoading(true);
      await deleteUser(selectedUser.id);
      // Update local state immediately after successful API call
      setUsers(prevUsers => 
        prevUsers.filter(user => user.id !== selectedUser.id)
      );
      setShowDeletePopup(false);
      setSelectedUser(null);
      setError(null);
      
      // Update pagination if necessary
      const newTotalPages = Math.ceil((users.length - 1) / ITEMS_PER_PAGE);
      setTotalPages(newTotalPages);
      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages);
      }
    } catch (err) {
      setError('Failed to delete user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      loadUsers();
      return;
    }

    const filteredUsers = users.filter(user => 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setUsers(filteredUsers);
    setTotalPages(Math.ceil(filteredUsers.length / ITEMS_PER_PAGE));
    setCurrentPage(1);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>USER MANAGEMENT DASHBOARD</h1>
        <button 
          className="add-user-btn"
          onClick={() => setShowAddForm(true)}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Add New User'}
        </button>
      </header>

      <main className="app-main">
        {loading && <div className="loading-overlay">Loading...</div>}
        
        <UserTable
          users={getCurrentPageUsers()}
          onEdit={(user) => {
            setSelectedUser(user);
            setShowEditForm(true);
          }}
          onDelete={(user) => {
            setSelectedUser(user);
            setShowDeletePopup(true);
          }}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>

      {showAddForm && (
        <AddUserForm
          onSubmit={handleAddUser}
          onClose={() => setShowAddForm(false)}
          loading={loading}
        />
      )}

      {showEditForm && selectedUser && (
        <EditFormPopup
          user={selectedUser}
          onSubmit={handleEditUser}
          onClose={() => {
            setShowEditForm(false);
            setSelectedUser(null);
          }}
          loading={loading}
        />
      )}

      {showDeletePopup && selectedUser && (
        <DeletePopup
          user={selectedUser}
          onConfirm={handleDeleteUser}
          onCancel={() => {
            setShowDeletePopup(false);
            setSelectedUser(null);
          }}
          loading={loading}
        />
      )}

      {error && (
        <ErrorMessage
          message={error}
          onClose={() => setError(null)}
        />
      )}
    </div>
  );
};

export default App;