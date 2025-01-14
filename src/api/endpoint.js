export const LOCALHOST = 'http://localhost:1234'

export const API_URL =
  "https://backend-for-occ-individual-capstone.onrender.com";


export const API_ENDPOINTS = {
  login: `${API_URL}/api/auth/login`,
  register: `${API_URL}/api/auth/register`,
  deleteUser: `${API_URL}/api/users/delete`, // Add delete user endpoint
  roles: {
    admin: `${API_URL}/api/users/admin`,
    seller: `${API_URL}/api/users/seller`,
    buyer: `${API_URL}/api/users/buyer`,
  },
};
