import { useEffect, useState } from "react";
import Input from "./Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GlowButton from "../buttons/GlowButton";
import {  API_URL } from "../../api/endpoint";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "",
    password: "",
    adminKey: "",
  });

  console.log(formData)

  const [error, setError] = useState(null);
  const [registerResponse, setRegisterResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData.username) {
      return "Username is required.";
    }
    if (!formData.email) {
      return "Email is required.";
    }
    if (!formData.role) {
      return "Please Select Your Role";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return "Please enter a valid email address.";
    }
    if (!formData.password) {
      return "Password is required.";
    }
    if (formData.password.length < 7) {
      return "Password must be at least 7 characters long.";
    }
    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match.";
    }
    return null; // No errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setError(null);
      setLoading(true);

      const registerResponse = await axios.post(
        `${API_URL}/api/auth/register`,
        formData
      );
      setRegisterResponse(registerResponse);

      console.log("Register response:", registerResponse);

      alert(`Email: ${formData.email} registered successfully!`);
      navigate("/login");
    } catch (err) {
      setError("Failed to sign up. Please choose a unique email and username");
      console.log(err);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" p-10 py-12 rounded shadow-lg shadow-gray-300 mx-auto w-full bg-black bg-opacity-70 text-white"
    >
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2 className="text-2xl font-bold my-4 w-full text-center">Sign Up</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      <p>Choose your Role:</p>
      <div className="flex items-center space-x-10 mb-5">
        <div className="flex space-x-5">
          <input
            type="radio"
            id="seller"
            name="role"
            value="seller"
            onChange={handleChange}
          />
          <label htmlFor="seller">Seller</label>
        </div>
        <div className="flex space-x-5">
          <input
            type="radio"
            id="buyer"
            name="role"
            value="buyer"
            onChange={handleChange}
          />
          <label htmlFor="buyer">Buyer</label>
        </div>
        <div className="flex space-x-5">
          <input
            type="radio"
            id="admin"
            name="role"
            value="admin"
            onChange={handleChange}
          />
          <label htmlFor="admin">Admin</label>
        </div>
      </div>
      {formData.role === "admin" && (
        <Input
          label="Admin Key"
          type="password"
          name="adminKey"
          placeholder="Enter your Admin Key"
          value={formData.adminKey}
          onChange={handleChange}
        />
      )}
      <Input
        label="Username"
        type="text"
        name="username"
        placeholder="Enter your Username"
        value={formData.username}
        onChange={handleChange}
      />
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
      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        placeholder="Re-enter your password"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      <div className="mt-10">
        <GlowButton
          loading={loading}
          loadingTitle={"Creating Account..."}
          title={"Sign Up"}
        />
      </div>
    </form>
  );
};

export default SignupForm;
