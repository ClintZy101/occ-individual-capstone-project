import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// Load Stripe with your publishable key
const stripePromise = loadStripe(
  "pk_test_51IydHXGUe6psHH9kBb7xAroiUpv60q0SEFJuJ59JwM3zMPaf1IS7VLJY6lbwxFvuO9emoSUtBvsJGGe1n47tIelB00QqdZEn94"
);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Elements stripe={stripePromise}>
        <App /> 
      </Elements>
    </Router>
  </StrictMode>
);
