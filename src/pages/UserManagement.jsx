import React, { useState } from "react";
import useFetchUsers from "../api/useFetchUsers";
import UsersSkeletonLoader from "../components/loader/UsersSkeletonLoader";
import { Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import useUserProfile from "../store/useUserProfileDetails";

export default function UserManagement() {
  const { users, loading, error, createUser, updateUser, deleteUser } =
    useFetchUsers();
  const { setUser } = useUserProfile();
  const [newUser, setNewUser] = useState({ username: "", email: "", role: "" });
  const [editingUser, setEditingUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("all");
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  const handleUser = (user) => {
    navigate(`/user/${user._id}`);
    setUser(user)
  };

  if (loading) return <UsersSkeletonLoader />;
  if (error)
    return <p className="text-red-500">Error loading users: {error.message}</p>;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleCreateUser = () => {
    createUser(newUser);
    setNewUser({ username: "", email: "", role: "" });
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
      case "admin":
        return "text-orange-500";
      case "seller":
        return "text-yellow-500";
      case "buyer":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const filteredUsers =
    selectedRole === "all"
      ? users
      : users.filter((user) => user.role === selectedRole);

  return (
    <div className="text-white min-h-screen p-5 bg-gray-900">
      <div className="w-full h-20 bg-black flex items-center justify-center mb-5">
        <h1 className="text-2xl font-bold">User Management</h1>
      </div>
      <div className="flex justify-center mb-5">
        <Button
          onClick={() => setSelectedRole("all")}
          className={`px-3 py-2 mx-1 ${
            selectedRole === "all" ? "bg-blue-500" : "bg-gray-700"
          } rounded-md`}
        >
          All
        </Button>
        <Button
          onClick={() => setSelectedRole("admin")}
          className={`px-3 py-2 mx-1 ${
            selectedRole === "admin" ? "bg-blue-500" : "bg-gray-700"
          } rounded-md`}
        >
          Admin
        </Button>
        <Button
          onClick={() => setSelectedRole("seller")}
          className={`px-3 py-2 mx-1 ${
            selectedRole === "seller" ? "bg-blue-500" : "bg-gray-700"
          } rounded-md`}
        >
          Seller
        </Button>
        <Button
          onClick={() => setSelectedRole("buyer")}
          className={`px-3 py-2 mx-1 ${
            selectedRole === "buyer" ? "bg-blue-500" : "bg-gray-700"
          } rounded-md`}
        >
          Buyer
        </Button>
      </div>
      <div className="grid gap-6">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="p-4 bg-gray-800 rounded-md shadow-md flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{user.username}</h2>
              <p className="text-gray-400">{user.email}</p>
              <p className="text-gray-400">
                Created At: {new Date(user.createdAt).toLocaleString()}
              </p>
              <p className="text-gray-400">
                Updated At: {new Date(user.updatedAt).toLocaleString()}
              </p>
            </div>
            <div>
              <p
                className={`text-gray-400 font-semibold text-lg ${getUserRoleColor(
                  user.role
                )}`}
              >
                {" "}
                {user.role}
              </p>
            </div>
            <div className="grid gap-4">
              {/* <div className="flex space-x-2">
                <Button
                  onClick={() => handleEditUser(user)}
                  className="px-3 py-2 bg-blue-500 hover:bg-blue-600 rounded-md"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteUser(user._id)}
                  className="px-3 py-2 bg-red-500 hover:bg-red-600 rounded-md"
                >
                  Delete
                </Button>
              </div> */}
              <div>

                  <Button 
                  onClick={()=>handleUser(user)}
                  className="px-3 py-2 bg-green-500 hover:bg-green-600 rounded-md w-full">
                    View Profile
                  </Button>

              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="mt-10">
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
        <Button
          onClick={handleCreateUser}
          className="p-2 bg-blue-500 rounded-md w-full "
        >
          Create User
        </Button>
      </div> */}
      {/* {editingUser && (
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-2">Edit User</h2>
          <input
            type="text"
            name="username"
            value={editingUser.username}
            onChange={(e) =>
              setEditingUser({ ...editingUser, username: e.target.value })
            }
            placeholder="Username"
            className="p-2 bg-gray-800 rounded-md mb-2 w-full"
          />
          <input
            type="email"
            name="email"
            value={editingUser.email}
            onChange={(e) =>
              setEditingUser({ ...editingUser, email: e.target.value })
            }
            placeholder="Email"
            className="p-2 bg-gray-800 rounded-md mb-2 w-full"
          />
          <input
            type="text"
            name="role"
            value={editingUser.role}
            onChange={(e) =>
              setEditingUser({ ...editingUser, role: e.target.value })
            }
            placeholder="Role"
            className="p-2 bg-gray-800 rounded-md mb-2 w-full"
          />
          <Button
            onClick={handleUpdateUser}
            className="p-2 bg-green-500 rounded-md w-full"
          >
            Update User
          </Button>
        </div>
      )} */}
    </div>
  );
}
