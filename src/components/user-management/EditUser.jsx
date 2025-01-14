import React from 'react'
import { Button } from "@material-tailwind/react";

export default function EditUser({setEditingUser, editingUser, handleUpdateUser, toggleEditUser}) {
  return (
   
        <div className="my-10">
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
          <div className="flex space-x-2 h-10 justify-end">
            <Button
              onClick={handleUpdateUser}
              className="p-2 bg-green-500 rounded-md w-[300px]"
            >
              Update User
            </Button>
            <Button
              onClick={toggleEditUser}
              className="p-2 bg-red-500 rounded-md w-[300px]"
            >
              Cancel
            </Button>
          </div>
        </div>

  )
}

