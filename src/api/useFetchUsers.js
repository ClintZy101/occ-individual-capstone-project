import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";
import { API_URL} from "./endpoint";

const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, user } = useAuthStore();

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/users/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
      console.log("all users: ", response.data);
    } catch (err) {
      setError(err);
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async (userData) => {
    setIsLoading(true)
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/register`,
        userData
      );
      fetchUsers();
      console.log(response.data)
    } catch (err) {
      setError(err);
    } finally{
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  const updateUser = async (userId, updatedData) => {
    setIsLoading(true)
    try {
      const response = await axios.put(`${API_URL}/api/users/edit/${userId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUsers();

      setUsers(
        users.map((user) => (user._id === userId ? response.data : user))
      );
      console.log(response.data)
    } catch (err) {
      setError(err);
    }finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  const deleteUser = async (userId) => {
    setIsLoading(true)
    try {
    const response =  await axios.delete(`${API_URL}/api/users/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUsers();
      console.log('user deleted successfully: ', response.data)
      // setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      setError(err);
    }finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  return {
    users,
    isLoading,
    error,
    createUser,
    updateUser,
    deleteUser,
  };
};

export default useFetchUsers;
