import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import { useState } from "react";
import ReactConfetti from "react-confetti";

const Checkout = ({ price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);

    const { data: { clientSecret } } = await axiosSecure.post(
      "/create-payment-intent",
      { price }
    );

    const cardElement = elements.getElement(CardElement);
    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      }
    );

    if (error) {
      setErrorMessage(error.message);
      setPaymentSuccess(null);
    } else if (paymentIntent.status === "succeeded") {
      setPaymentSuccess("Payment Successful");
      setErrorMessage(null);
    }
    setIsProcessing(false);
  };

  return (
    <div>
        {/* React confetti here */}
        {paymentSuccess && <ReactConfetti/> }
        {/* React confetti here */}

      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded max-w-md mx-auto"
      >
        <h2 className="text-lg font-semibold mb-4">
          Total Amount: ${price.toFixed(2)}
        </h2>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
          disabled={!stripe || isProcessing}
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        {paymentSuccess && (
          <p className="text-green-500 mt-2">{paymentSuccess}</p>
        )}
      </form>
    </div>
  );
};

Checkout.propTypes = {
  price: PropTypes.number,
};
export default Checkout;
