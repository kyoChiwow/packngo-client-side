import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-6">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-6xl font-extrabold text-gray-800"
      >
        404
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="text-xl text-gray-600 mt-4"
      >
        Oops! The page you are looking for does not exist.
      </motion.p>
      <motion.img 
        src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
        alt="404 Illustration"
        className="w-64 h-64 mt-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
      />
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
        className="mt-6"
      >
        <Link to="/" className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
          Go Home
        </Link>
      </motion.div>
    </div>
  );
};

export default Error404;
