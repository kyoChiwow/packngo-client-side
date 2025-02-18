import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Johnson",
    review: "PackNGo made my deliveries seamless! Super fast and reliable.",
    image: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    name: "David Miller",
    review: "Their tracking system is top-notch. Never lost a package!",
    image: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    name: "Emily Carter",
    review: "Customer support was amazing. They solved my issue within minutes!",
    image: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    name: "James Anderson",
    review: "Best delivery service I have used. Highly recommende!",
    image: "https://randomuser.me/api/portraits/men/3.jpg"
  }
];

const Testimonials = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">What Our Customers Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.2 }}
            className="p-6 bg-white shadow-xl rounded-2xl border border-gray-200"
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-blue-500"
            />
            <h3 className="text-xl font-semibold text-gray-900">{testimonial.name}</h3>
            <p className="text-gray-600 mt-2">{testimonial.review}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
