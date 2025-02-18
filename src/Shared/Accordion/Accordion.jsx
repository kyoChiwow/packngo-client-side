import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "How do I track my parcel?",
    answer:
      "You can track your parcel in real time by entering the tracking ID in the tracking section of your dashboard. Our system provides live updates on the parcel's location, estimated delivery time, and status changes. Additionally, you can enable notifications to receive alerts about any updates regarding your delivery status, ensuring you are always informed.",
  },
  {
    question: "How do I register for a PackNGo account?",
    answer:
      "Click on the ‘Sign Up’ button, fill in the required details, and verify your email to activate your account. Once registered, you can log in to access features like parcel tracking, delivery scheduling, and profile management. We recommend setting up your profile details completely to enjoy a seamless experience, including adding a preferred delivery address and contact information.",
  },
  {
    question: "Can I change my delivery address after placing an order?",
    answer:
      "Yes, you can update your delivery address from your profile settings before the parcel is out for delivery. If your parcel has already been dispatched, you may contact our customer support team to check if address modifications are possible. Please note that last-minute address changes may cause delays in delivery, so we recommend verifying your address before confirming an order.",
  },
  {
    question: "What should I do if my parcel is delayed?",
    answer:
      "Check the real-time tracking updates in your dashboard. If delayed, contact our support team for assistance. Delays can occur due to various factors, such as high traffic, weather conditions, or operational issues. Our support team is available 24/7 to provide updates and assist you with any inquiries regarding the status of your parcel.",
  },
  {
    question: "Is my personal information secure with PackNGo?",
    answer:
      "Yes, we use secure authentication and data encryption to protect your personal details. Our platform follows industry-standard security measures, including SSL encryption, multi-factor authentication, and regular security audits, ensuring that your information is safeguarded against unauthorized access.",
  },
  {
    question: "How do I rate my delivery personnel?",
    answer:
      "Once your parcel is delivered, you can leave a rating and review through the parcel history section. Feedback helps us maintain high service standards and recognize top-performing delivery personnel. We encourage honest and detailed reviews to improve the quality of our services and ensure a positive experience for all users.",
  },
  {
    question: "Can I schedule a delivery for a specific time?",
    answer:
      "Yes, you can select a preferred delivery time while placing your order, based on available slots. Scheduling allows you to receive parcels at a time that is convenient for you, reducing missed deliveries and enhancing your overall experience. We recommend booking time slots in advance, especially during peak hours.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can reach our support team through the ‘Contact Us’ section on the website or via live chat. Our representatives are available round-the-clock to assist with any inquiries, from tracking updates to parcel issues. For urgent matters, we also offer a dedicated helpline that you can call for immediate assistance.",
  },
  {
    question: "What happens if my parcel is lost?",
    answer:
      "If your parcel is lost, report it immediately via your dashboard. Our team will investigate and assist you. We conduct a thorough review of the parcel's last known location, coordinate with the delivery personnel, and take necessary actions to resolve the issue. In cases where a parcel is deemed lost, we offer compensation based on our policies.",
  },
  {
    question: "How are top-performing delivery personnel selected?",
    answer:
      "Delivery personnel are rated based on performance, user reviews, and successful deliveries. We analyze various factors, including punctuality, customer feedback, and delivery efficiency, to recognize and reward top performers. Our goal is to ensure that our users receive the best service possible by highlighting and incentivizing dedicated delivery personnel.",
  },
];

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg shadow-sm overflow-hidden"
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center p-4 text-lg font-medium bg-gray-100 hover:bg-gray-200"
            >
              {faq.question}
              <FaChevronDown
                className={`transition-transform duration-500 ease-in-out ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="p-4 bg-white text-gray-700"
              >
                {faq.answer}
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
