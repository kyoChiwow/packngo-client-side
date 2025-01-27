import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Button } from "./ui/button";
import moment from "moment";

const ReviewModal = ({ deliveryManId, closeModal }) => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const reviewData = {
      ...data,
      userName: user?.displayName,
      userImage: user?.photoURL,
      deliveryManId,
      createdAt: moment().format("YYYY-MM-DD")
    };
    const res = await axiosSecure.post("/review", reviewData);
    if (res.data.insertedId) {
      Swal.fire({
        title: "Good job!",
        text: "You have successfully given your review!",
        icon: "success",
      });
    }
    reset();
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Give a Review</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* User Name (Auto-filled) */}
          <div className="mb-4">
            <label className="block font-medium mb-1">User Name</label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="w-full p-2 border rounded"
            />
          </div>

          {/* User Image (Auto-filled) */}
          <div className="mb-4">
            <label className="block font-medium mb-1">User Image</label>
            <input
              type="text"
              value={user?.photoURL || ""}
              readOnly
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Delivery Man ID (Auto-filled) */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Delivery Man ID</label>
            <input
              type="text"
              value={deliveryManId}
              readOnly
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Rating */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Rating</label>
            <input
              type="number"
              step={0.1}
              {...register("rating", { required: true, min: 1, max: 5 })}
              placeholder="Rate out of 5"
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Feedback */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Feedback</label>
            <textarea
              {...register("feedback", { required: true })}
              placeholder="Write your feedback here..."
              className="w-full p-2 border rounded"
              rows="4"
            ></textarea>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" onClick={closeModal} className="bg-[#00e699] bg-opacity-80">
              Cancel
            </Button>
            <Button type="submit" className="bg-[#00e699] bg-opacity-80">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

ReviewModal.propTypes = {
  deliveryManId: PropTypes.string,
  closeModal: PropTypes.func,
};
export default ReviewModal;
