import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";
import { LOCALHOST } from "./endpoint";

const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, user } = useAuthStore();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${LOCALHOST}api/users/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
        console.log('all users: ',response.data);
      } catch (err) {
        setError(err);
      } finally {
        setTimeout(() => setIsLoading(false), 1000);
      }
    };

    fetchUsers();
  }, []);

  const createUser = async (userData) => {
    try {
      const response = await axios.post("/api/users", userData);
      setUsers([...users, response.data]);
    } catch (err) {
      setError(err);
    }
  };

  const updateUser = async (userId, updatedData) => {
    try {
      const response = await axios.put(`/api/users/${userId}`, updatedData);
      setUsers(
        users.map((user) => (user._id === userId ? response.data : user))
      );
    } catch (err) {
      setError(err);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`/api/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      setError(err);
    }
  };

  return {
    users,
    loading: isLoading,
    error,
    createUser,
    updateUser,
    deleteUser,
  };
};

export default useFetchUsers;
