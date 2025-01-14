import React, { useState } from "react";
import useFetchUsers from "../api/useFetchUsers";
import UsersSkeletonLoader from "../components/loader/UsersSkeletonLoader";
import { Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import useUserProfile from "../store/useUserProfileDetails";
import AddUser from "../components/user-management/AddUser";
import EditUser from "../components/user-management/EditUser";
import DeleteUserModal from "../components/user-management/DeleteUserModal";

export default function UserManagement() {
  const { users, isLoading, error, createUser, updateUser, deleteUser } =
    useFetchUsers();
  const { setUser } = useUserProfile();
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedRole, setSelectedRole] = useState("all");
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('')

  const toggleAddUser = () =>{
    setShowAddUser(prevState => !prevState)
  }
  const toggleEditUser =() =>{
    setEditingUser(null)
  }
  const toggleDeleteModal =(id, user) =>{
    setShowDeleteModal(prevState=> !prevState)
    setUserId(id)
    setUserName(user.username)
  }
  console.log(userName)
  const navigate = useNavigate();

  const handleUser = (user) => {
    navigate(`/user/${user?._id}`);
    setUser(user);
  };

  if (isLoading) return <UsersSkeletonLoader />;
  if (error)
    return <p className="text-red-500">Error loading users: {error.message}</p>;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleCreateUser = () => {
    createUser(newUser);
    setNewUser({ username: "", email: "", role: "" });
    toggleAddUser();
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
      {showDeleteModal && <DeleteUserModal handleDeleteUser={handleDeleteUser} isOpen={showDeleteModal} onClose={toggleDeleteModal} userId={userId} userName={userName}/>}
      <div className="w-full h-20 bg-black flex items-center justify-center mb-5">
        <h1 className="text-2xl font-bold">User Management</h1>
      </div>
      <div>
        {showAddUser && (
          <AddUser
            handleCreateUser={handleCreateUser}
            handleInputChange={handleInputChange}
            newUser={newUser}
            toggleAddUser={toggleAddUser}
          />
        )}
        {editingUser && <EditUser toggleEditUser={toggleEditUser} handleUpdateUser={handleUpdateUser} setEditingUser={setEditingUser} editingUser={editingUser} />}
      </div>
      <div className="flex justify-between mb-5">
        <div className="flex justify-center">
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
        <div>
        <Button
            onClick={() => setShowAddUser(true)}
            className="bg-purple-500"
          >
            Add User
          </Button>
        </div>
       
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
              <div className="flex space-x-2">
                <Button
                  onClick={() => handleEditUser(user)}
                  className="px-3 py-2 bg-blue-500 hover:bg-blue-600 rounded-md"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => toggleDeleteModal(user._id, user)}
                  className="px-3 py-2 bg-red-500 hover:bg-red-600 rounded-md"
                >
                  Delete User
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => handleUser(user)}
                  className="px-3 py-2 bg-green-500 hover:bg-green-600 rounded-md w-full"
                >
                  View Profile
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
