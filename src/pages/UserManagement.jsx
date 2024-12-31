import React, { useState } from 'react';
import useFetchUsers from '../api/useFetchUsers';
import UsersSkeletonLoader from '../components/loader/UsersSkeletonLoader';


export default function UserManagement() {
  const { users, loading, error, createUser, updateUser, deleteUser } = useFetchUsers();
  const [newUser, setNewUser] = useState({ username: '', email: '', role: '' });
  const [editingUser, setEditingUser] = useState(null);

  if (loading) return <UsersSkeletonLoader />;
  if (error) return <p className="text-red-500">Error loading users: {error.message}</p>;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleCreateUser = () => {
    createUser(newUser);
    setNewUser({ username: '', email: '', role: '' });
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleUpdateUser = () => {
    updateUser(editingUser._id, editingUser);
    setEditingUser(null);
  };

  const handleDeleteUser = (userId) => {
    deleteUser(userId);
  };

  const getUserRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'text-purple-500';
      case 'seller':
        return 'text-yellow-500';
      case 'buyer':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="text-white min-h-screen p-5 bg-gray-900">
      <div className="w-full h-20 bg-black flex items-center justify-center mb-5">
        <h1 className="text-2xl font-bold">User Management</h1>
      </div>
      <div className="grid gap-6">
        {users.map(user => (
          <div key={user._id} className="p-4 bg-gray-800 rounded-md shadow-md flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">{user.username}</h2>
              <p className="text-gray-400">{user.email}</p>
              <p className={`text-gray-400 ${getUserRoleColor(user.role)}`}>Role: {user.role}</p>
              <p className="text-gray-400">Created At: {new Date(user.createdAt).toLocaleString()}</p>
              <p className="text-gray-400">Updated At: {new Date(user.updatedAt).toLocaleString()}</p>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => handleEditUser(user)} className="px-3 py-1 bg-blue-500 rounded-md">Edit</button>
              <button onClick={() => handleDeleteUser(user._id)} className="px-3 py-1 bg-red-500 rounded-md">Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-2">Create New User</h2>
        <input
          type="text"
          name="username"
          value={newUser.username}
          onChange={handleInputChange}
          placeholder="Username"
          className="p-2 bg-gray-800 rounded-md mb-2 w-full"
        />
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="p-2 bg-gray-800 rounded-md mb-2 w-full"
        />
        <input
          type="text"
          name="role"
          value={newUser.role}
          onChange={handleInputChange}
          placeholder="Role"
          className="p-2 bg-gray-800 rounded-md mb-2 w-full"
        />
        <button onClick={handleCreateUser} className="p-2 bg-blue-500 rounded-md w-full">Create User</button>
      </div>
      {editingUser && (
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-2">Edit User</h2>
          <input
            type="text"
            name="username"
            value={editingUser.username}
            onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
            placeholder="Username"
            className="p-2 bg-gray-800 rounded-md mb-2 w-full"
          />
          <input
            type="email"
            name="email"
            value={editingUser.email}
            onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
            placeholder="Email"
            className="p-2 bg-gray-800 rounded-md mb-2 w-full"
          />
          <input
            type="text"
            name="role"
            value={editingUser.role}
            onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
            placeholder="Role"
            className="p-2 bg-gray-800 rounded-md mb-2 w-full"
          />
          <button onClick={handleUpdateUser} className="p-2 bg-green-500 rounded-md w-full">Update User</button>
        </div>
      )}
    </div>
  );
}
