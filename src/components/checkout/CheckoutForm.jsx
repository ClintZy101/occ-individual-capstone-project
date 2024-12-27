import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useCartStore from "../../store/useCartLocalStorage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LOCALHOST } from "../../api/endpoint";

export default function CheckoutForm() {
  const { cartItems, getTotalPrice, clearCart } = useCartStore();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [shippingFee, setShippingFee] = useState(10);
  const total = (getTotalPrice() + shippingFee).toFixed(2);
  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const handleChange = (event) => {
    setShippingAddress({
      ...shippingAddress,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const amountInCents = Math.floor(total * 100); // Convert to cents

      const response = await axios.post(
        `${LOCALHOST}api/payment/create-payment-intent`,
        {
          amount: amountInCents,
          currency: "usd",
        }
      );

      const { clientSecret } = response.data;
      const cardElement = elements.getElement(CardElement);

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: shippingAddress.name,
            address: {
              line1: shippingAddress.address,
              city: shippingAddress.city,
              state: shippingAddress.state,
              postal_code: shippingAddress.postalCode,
              country: shippingAddress.country,
            },
          },
        },
      });

      if (paymentResult.error) {
        alert(`Payment failed: ${paymentResult.error.message}`);
      } else {
        alert("Payment successful!");
        navigate("/account/myorders");
        clearCart();
        cardElement.clear();
        setSucceeded(true);
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h2 className="text-2xl mb-5">Shipping Address</h2>
      <div className="mb-4">
        <label className="block mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={shippingAddress.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Address</label>
        <input
          type="text"
          name="address"
          value={shippingAddress.address}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">City</label>
        <input
          type="text"
          name="city"
          value={shippingAddress.city}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">State</label>
        <input
          type="text"
          name="state"
          value={shippingAddress.state}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Postal Code</label>
        <input
          type="text"
          name="postalCode"
          value={shippingAddress.postalCode}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Country</label>
        <input
          type="text"
          name="country"
          value={shippingAddress.country}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <h2 className="text-2xl mb-5">Payment Details</h2>
      <div className="mb-4">
        <CardElement className="p-2 border border-gray-300 rounded" />
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <button
        type="submit"
        disabled={processing || !stripe || !elements}
        className="px-5 py-2 bg-purple-500 text-white w-full hover:bg-purple-700 text-xl"
      >
        {processing ? "Processing..." : `Pay $${total}`}
      </button>
      {succeeded && (
        <div className="text-green-500 mt-4">Payment succeeded!</div>
      )}
    </form>
  );
}