import { motion } from "framer-motion";
import { FaUserPlus, FaCalendarCheck, FaMapMarkedAlt, FaBoxOpen } from "react-icons/fa";

const steps = [
  {
    icon: <FaUserPlus className="text-4xl text-blue-600" />, 
    title: "Sign Up",
    description: "Create a free account to start using PackNGo’s services effortlessly."
  },
  {
    icon: <FaCalendarCheck className="text-4xl text-green-600" />, 
    title: "Schedule & Track",
    description: "Book a delivery or track your existing orders in real-time."
  },
  {
    icon: <FaMapMarkedAlt className="text-4xl text-yellow-600" />, 
    title: "Real-Time Updates",
    description: "Stay informed with live tracking and instant notifications."
  },
  {
    icon: <FaBoxOpen className="text-4xl text-purple-600" />, 
    title: "Delivery Received",
    description: "Your parcel arrives safely and on time, hassle-free."
  }
];

const HowItWorks = () => {
  return (
    <div className="p-6 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">How It Works</h2>
      <div className="grid md:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center"
          >
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-lg font-semibold text-gray-700">{step.title}</h3>
            <p className="text-gray-500 text-sm mt-2">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
