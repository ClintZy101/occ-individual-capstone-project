import { useParams } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import { API_URL, LOCALHOST } from "./endpoint";



export default function useFetchUserProfile() {

const { token } = useAuthStore();
const [user, setUser] = useState(null);
const [salesActivity, setSalesActivity] = useState([]);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${LOCALHOST}/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      const salesResponse = await axios.get(`${LOCALHOST}/api/sales/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSalesActivity(salesResponse.data);
    } catch (err) {
      console.error('Error fetching user profile', err);
    } finally {
      setIsLoading(false);
    }
  };

  fetchUserProfile();
}, [userId, token]);

return{

}
}