# User Management Dashboard

A React-based user management system that allows you to perform CRUD (Create, Read, Update, Delete) operations on user data. The application features a clean interface with pagination and search functionality.

## 🚀 Features

- **User Management**
  - View list of users with pagination
  - Add new users
  - Edit existing user details
  - Delete users
  - Search users by name, email, or department

- **Error Handling**
  - Comprehensive error messages
  - Loading states for operations
  - Validation for required fields

- **UI Components**
  - Responsive table view
  - Modal forms for add/edit operations
  - Confirmation dialogs for delete operations
  - Error message notifications

## 🛠️ Tech Stack

- React.js
- Axios for API calls
- JSONPlaceholder API for backend simulation
- CSS for styling

## 📋 Prerequisites

Before running this project, make sure you have:
- Node.js (v14 or higher)
- npm or yarn package manager

## 🔧 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd user-management-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

## 📁 Project Structure

```
src/
├── components/
│   ├── UserList/
│   │   └── UserTable.jsx
│   ├── DeletePopup/
│   │   └── DeletePopup.jsx
│   ├── UserForm/
│   │   └── AddUserForm.jsx
│   ├── Edit/
│   │   └── EditFormPopup.jsx
│   └── ErrorMessage/
│       └── ErrorMessage.jsx
├── Services/
│   └── api.js
├── App.jsx
├── App.css
└── index.js
```

## 🔌 API Integration

The application uses JSONPlaceholder API for demonstrating CRUD operations. The API endpoints are:

```javascript
const API_URL = 'https://jsonplaceholder.typicode.com/users';

// Endpoints
GET    /users          // Fetch all users
POST   /users          // Create new user
PUT    /users/:id      // Update user
DELETE /users/:id      // Delete user
```

Note: JSONPlaceholder is a fake API that doesn't actually persist changes, but the application maintains state locally to demonstrate functionality.

## 🎯 Usage

### Adding a User
1. Click "Add New User" button
2. Fill in the required fields:
   - First Name
   - Last Name
   - Email
   - Department
3. Submit the form

### Editing a User
1. Click the edit icon next to the user
2. Modify the desired fields
3. Click "Update" to save changes

### Deleting a User
1. Click the delete icon next to the user
2. Confirm the deletion in the popup dialog

### Searching Users
- Use the search bar to filter users by name, email, or department
- Results update automatically as you type

## ⚙️ Configuration

### Pagination
You can modify the items per page by changing the `ITEMS_PER_PAGE` constant in `App.jsx`:

```javascript
const ITEMS_PER_PAGE = 5; // Change this value as needed
```



