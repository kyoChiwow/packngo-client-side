import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import Loading from "@/Pages/Loading/Loading";
import Title from "@/Shared/Title/Title";
import { useEffect, useState } from "react";

const MyReviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  console.log(reviews);

  useEffect(() => {
    const fetchDeliveryManAndReviews = async () => {
      const deliveryManRes = await axiosSecure.get(
        `/review/deliveryman?email=${user.email}`
      );
      const deliveryManId = deliveryManRes.data._id;

      const reivewsRes = await axiosSecure.get(
        `/find/reviews?deliveryManId=${deliveryManId}`
      );
      setReviews(reivewsRes.data);
    };
    setLoading(false);
    if (user?.email) {
      fetchDeliveryManAndReviews();
    }
  }, [axiosSecure, user.email]);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <header>
        <Title
          mainTitle="My Reviews"
          subTitle="Here you can see all the review that you get from the parcels you delivered"
        />
      </header>

      <main className="max-w-[90%] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review._id} className="border p-4 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <img
                  src={review.userImage}
                  alt={review.userName}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-bold">{review.userName}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="text-yellow-500 font-semibold mb-2">
                Rating: {review.rating}/5
              </p>
              <p className="text-gray-700">{review.feedback}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MyReviews;
