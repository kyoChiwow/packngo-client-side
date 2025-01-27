import Title from "@/Shared/Title/Title";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
    const location = useLocation();
    const price  = location.state?.price || 0;

    return (
        <div>
            <header>
                <Title
                mainTitle="Payment"
                subTitle="Check out the form below to pay your amount"
                />
            </header>
            
            <main className="max-w-[90%] mx-auto">
                <div>
                    <Elements stripe={stripePromise}>
                        <Checkout price={price}></Checkout>
                    </Elements>
                </div>
            </main>
        </div>
    );
};

export default Payment;