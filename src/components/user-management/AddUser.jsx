import React from 'react'
import { Button } from "@material-tailwind/react";

export default function AddUser({handleInputChange, newUser, handleCreateUser, toggleAddUser}) {
  return (
    <div className="my-10">
              <h2 className="text-xl font-bold mb-2">Create New User</h2>
              <p>Choose your Role:</p>
              <div className="flex items-center space-x-10 mb-5">
                <div className="flex space-x-5">
                  <input
                    type="radio"
                    id="seller"
                    name="role"
                    value="seller"
                    onChange={handleInputChange}
                  />
                  <label htmlFor="seller">Seller</label>
                </div>
                <div className="flex space-x-5">
                  <input
                    type="radio"
                    id="buyer"
                    name="role"
                    value="buyer"
                    onChange={handleInputChange}
                  />
                  <label htmlFor="buyer">Buyer</label>
                </div>
              </div>
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
                type="password"
                name="password"
                value={newUser.password}
                onChange={handleInputChange}
                placeholder="**********"
                className="p-2 bg-gray-800 rounded-md mb-2 w-full"
              />
    
              <input
                type="text"
                name="role"
                value={newUser.role}
                onChange={handleInputChange}
                disabled
                placeholder="Role"
                className="p-2 bg-gray-800 rounded-md mb-2 w-full cursor-not-allowed"
              />
              <div className="w-full justify-center flex space-x-5 mt-2 mb-10">
                <Button
                  onClick={handleCreateUser}
                  className="p-2 bg-blue-500 rounded-md w-[300px] h-10 "
                >
                  Create User
                </Button>
                <Button
                  onClick={toggleAddUser}
                  className="p-2 bg-red-500 rounded-md w-[300px] h-10 "
                >
                  Cancel
                </Button>
              </div>
    
           
            </div>
  )
}
