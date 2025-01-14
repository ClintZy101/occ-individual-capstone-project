import { useEffect, useState } from "react";
import Input from "./Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GlowButton from "../buttons/GlowButton";
import { useAuthStore } from "../../store/useAuthStore";
import { API_URL } from "../../api/endpoint";

const LoginForm = () => {
  const { setUser, setToken, setTokenExpiry } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Clear error on input change
  };

  const validateInput = () => {
    const { email, password } = formData;
    if (!email || !password) return "Email and password are required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email format.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateInput(); // Validate input fields
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        formData
      );
      setUser(response.data.user);
      setToken(response.data.token);
      setTokenExpiry(response.data.tokenExpiry);

      console.log("response", response.data);
      navigate("/"); // Only navigate if login is successful
    } catch (err) {
      setError("Failed to sign in. Please check your credentials.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" p-10 py-12 rounded shadow-lg shadow-gray-300 mx-auto w-full bg-black bg-opacity-70 text-white"
    >
      {/* Sample Logo */}
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2 className="text-2xl font-bold my-4 w-full text-center">Sign In</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
      />
      <div className="mt-10">
        <GlowButton
          loading={loading}
          loadingTitle={"Signing In"}
          title={"Sign In"}
        />
      </div>
    </form>
  );
};

export default LoginForm;
