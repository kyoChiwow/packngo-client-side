import { motion } from "framer-motion";

const blogs = [
  {
    title: "5 Tips to Ensure Your Package Arrives on Time",
    description: "Learn how to avoid delays and ensure your parcel reaches its destination without hassle.",
    link: "#"
  },
  {
    title: "How PackNGo Ensures Secure Parcel Handling",
    description: "Discover the measures we take to keep your shipments safe and protected throughout the journey.",
    link: "#"
  },
  {
    title: "Why Our Real-Time Tracking System is the Best",
    description: "Stay updated on your parcel’s exact location with our industry-leading tracking technology.",
    link: "#"
  }
];

const LatestBlogNews = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Latest Blog & News</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {blogs.map((blog, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white shadow-lg rounded-lg p-5 hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{blog.title}</h3>
            <p className="text-gray-600 mb-4">{blog.description}</p>
            <a href={blog.link} className="text-blue-500 font-medium hover:underline">Read More →</a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LatestBlogNews;
