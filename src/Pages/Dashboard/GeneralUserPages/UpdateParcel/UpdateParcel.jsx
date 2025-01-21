import { Button } from "@/components/ui/button";
import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import Title from "@/Shared/Title/Title";
import moment from "moment";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const {
    _id,
    bookingName,
    bookingEmail,
    bookingPhone,
    bookingPercelType,
    bookingWeight,
    bookingReceiverName,
    bookingReceiverNumber,
    bookingReceiverAddress,
    bookingDeliveryDate,
    bookingAddressLatitute,
    bookingAddressLongitude,
  } = useLoaderData();
  
  const { user } = useAuth();
  const [price, setPrice] = useState(0);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    if (bookingWeight) {
      setPrice(calculatePrice(Number(bookingWeight)));
    }
  }, [bookingWeight]);

  const percelWeight = watch("bookingWeight");

  const calculatePrice = (weight) => {
    if (weight <= 1) return 50;
    if (weight <= 2) return 100;
    return 150;
  };

  //   Update price here
  if (percelWeight) {
    const calculatedPrice = calculatePrice(Number(percelWeight));
    if (calculatedPrice !== price) setPrice(calculatedPrice);
  }

  const onSubmit = async (data) => {
    const finalData = {
          ...data,
          price,
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss")
        };
        
        // Update the data in backend
        const res = await axiosSecure.patch(`/parcels/${_id}`, finalData);
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                title: "Good job!",
                text: `${data.bookingName}, Your parcel is updated in the booking`,
                icon: "success",
                willClose: () => {
                    navigate("/dashboard/my-percels")
                }
              });
        }

  };

  return (
    <div>
      <header>
        <Title
          mainTitle="Update Booking"
          subTitle="Please check the form below if you want to update your booking"
        ></Title>
      </header>

      <main className="p-4">
        <div className="lg:w-[80%] w-full flex flex-col items-center bg-white shadow-xl bg-opacity-60 p-4 rounded-md mx-auto">
          {/* form div here */}
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col lg:flex-row items-start justify-between">
              <div className="lg:w-[49%] w-full">
                {/* Name div */}
                <div className="flex flex-col">
                  <div>
                    <p className="text-sm mb-1">Your Name :</p>
                  </div>
                  <input
                    type="text"
                    className="border rounded-md py-1 px-2 w-full"
                    placeholder="Enter Your Name"
                    defaultValue={bookingName}
                    name="bookingName"
                    {...register("bookingName", { required: true })}
                  />
                  {errors.registerName && (
                    <span className="text-red-600 mt-2 ml-1">
                      Your Name is required
                    </span>
                  )}
                </div>
                {/* Name div */}

                {/* Email div */}
                <div className="mt-4 flex flex-col">
                  <div>
                    <p className="text-sm mb-1">Your Email :</p>
                  </div>
                  <input
                    type="email"
                    className="border rounded-md py-1 px-2 w-full"
                    placeholder="Enter Your Email"
                    value={bookingEmail}
                    name="bookingEmail"
                    {...register("bookingEmail", { required: true })}
                  />
                  {errors.registerEmail && (
                    <span className="text-red-600 mt-2 ml-1">
                      Your Email is required
                    </span>
                  )}
                </div>
                {/* Email div */}

                {/* Phone Number div */}
                <div className="mt-4 flex flex-col">
                  <div>
                    <p className="text-sm mb-1">Your Phone Number :</p>
                  </div>
                  <input
                    type="number"
                    className="border rounded-md py-1 px-2 w-full"
                    placeholder="Enter Your Phone Number"
                    defaultValue={bookingPhone}
                    name="bookingPhone"
                    {...register("bookingPhone", { required: true })}
                  />
                  {errors.bookingPhone && (
                    <span className="text-red-600 mt-2 ml-1">
                      Your Phone Number is required
                    </span>
                  )}
                </div>
                {/* Phone Number div */}

                {/* Percel Type div */}
                <div className="mt-4 flex flex-col">
                  <div>
                    <p className="text-sm mb-1">Your Percel Type :</p>
                  </div>
                  <input
                    type="text"
                    className="border rounded-md py-1 px-2 w-full"
                    placeholder="Enter Your Percel Type"
                    defaultValue={bookingPercelType}
                    name="bookingPercelType"
                    {...register("bookingPercelType", { required: true })}
                  />
                  {errors.bookingPercelType && (
                    <span className="text-red-600 mt-2 ml-1">
                      Your Parcel Type is required
                    </span>
                  )}
                </div>
                {/* Percel Type div */}

                {/* Percel Weight div */}
                <div className="mt-4 flex flex-col">
                  <div>
                    <p className="text-sm mb-1">Percel Weight (In KG) :</p>
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    min="0.1"
                    className="border rounded-md py-1 px-2 w-full"
                    placeholder="Enter Your Percel Weight"
                    defaultValue={bookingWeight}
                    name="bookingWeight"
                    {...register("bookingWeight", {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />
                  {errors.bookingWeight && (
                    <span className="text-red-600 mt-2 ml-1">
                      Your Parcel Weight is required
                    </span>
                  )}
                </div>
                {/* Percel Weight div */}

                {/* Receivers Name div */}
                <div className="mt-4 flex flex-col">
                  <div>
                    <p className="text-sm mb-1">Receiver Name :</p>
                  </div>
                  <input
                    type="text"
                    className="border rounded-md py-1 px-2 w-full"
                    placeholder="Enter Receiver's Name"
                    defaultValue={bookingReceiverName}
                    name="bookingReceiverName"
                    {...register("bookingReceiverName", { required: true })}
                  />
                  {errors.bookingReceiversName && (
                    <span className="text-red-600 mt-2 ml-1">
                      Receiver name is required
                    </span>
                  )}
                </div>
                {/* Receives Name div */}
              </div>

              <div className="lg:w-[49%] w-full">
                {/* Phone Number div */}
                <div className="flex flex-col">
                  <div>
                    <p className="text-sm mb-1">Receiver Phone Number :</p>
                  </div>
                  <input
                    type="number"
                    className="border rounded-md py-1 px-2 w-full"
                    placeholder="Enter Receiver's Phone Number"
                    defaultValue={bookingReceiverNumber}
                    name="bookingReceiverNumber"
                    {...register("bookingReceiverNumber", { required: true })}
                  />
                  {errors.bookingReceiverNumber && (
                    <span className="text-red-600 mt-2 ml-1">
                      Receiver number is required
                    </span>
                  )}
                </div>
                {/* Phone Number div */}

                {/* Receivers Address div */}
                <div className="mt-4 flex flex-col">
                  <div>
                    <p className="text-sm mb-1">Receiver Address :</p>
                  </div>
                  <input
                    type="text"
                    className="border rounded-md py-1 px-2 w-full"
                    placeholder="Enter Receiver's Address"
                    defaultValue={bookingReceiverAddress}
                    name="bookingReceiverAddress"
                    {...register("bookingReceiverAddress", { required: true })}
                  />
                  {errors.bookingReceiverAddress && (
                    <span className="text-red-600 mt-2 ml-1">
                      Receiver address is required
                    </span>
                  )}
                </div>
                {/* Receives Address div */}

                {/* Delivery Date div */}
                <div className="mt-4 flex flex-col">
                  <div>
                    <p className="text-sm mb-1">Requested Delivery Date :</p>
                  </div>
                  <input
                    type="date"
                    className="border rounded-md py-1 px-2 w-full"
                    placeholder="Enter Requested Delivery Date"
                    defaultValue={bookingDeliveryDate}
                    name="bookingDeliveryDate"
                    {...register("bookingDeliveryDate", { required: true })}
                  />
                  {errors.bookingDeliveryDate && (
                    <span className="text-red-600 mt-2 ml-1">
                      Expected delivery date is required
                    </span>
                  )}
                </div>
                {/* Delivery Date div */}

                {/* Delivery Address Latitude div */}
                <div className="mt-4 flex flex-col">
                  <div>
                    <p className="text-sm mb-1">Receiver Address Latitute :</p>
                  </div>
                  <input
                    type="number"
                    step="0.000001"
                    min="-90"
                    max="90"
                    className="border rounded-md py-1 px-2 w-full"
                    defaultValue={bookingAddressLatitute}
                    placeholder="Enter Receiver's Latitude (e.g., 21.121365496)"
                    name="bookingAddressLatitute"
                    {...register("bookingAddressLatitute", {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />
                  {errors.bookingAddressLatitute && (
                    <span className="text-red-600 mt-2 ml-1">
                      Receiver address latitude is required
                    </span>
                  )}
                </div>
                {/* Delivery Address Latitude div */}

                {/* Delivery Address Longitude div */}
                <div className="mt-4 flex flex-col">
                  <div>
                    <p className="text-sm mb-1">Receiver Address Longitude :</p>
                  </div>
                  <input
                    type="number"
                    step="0.000001"
                    min="-180"
                    max="180"
                    className="border rounded-md py-1 px-2 w-full"
                    defaultValue={bookingAddressLongitude}
                    placeholder="Enter Receivers Longitude (e.g., 21.121365496)"
                    name="bookingAddressLongitude"
                    {...register("bookingAddressLongitude", {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />
                  {errors.bookingAddressLongitude && (
                    <span className="text-red-600 mt-2 ml-1">
                      Receiver address longitude is required
                    </span>
                  )}
                </div>
                {/* Delivery Address Longitude div */}
              </div>
            </div>

            {/* Price div */}
            <div className="mt-4 flex flex-col">
              <p className="text-sm mb-1">Price (in Tk):</p>
              <div className="border rounded-md py-1 px-2 w-full bg-gray-100">
                {price} Tk
              </div>
            </div>
            {/* Price div */}

            {/* Submit Button div */}
            <div className="mt-8 w-full">
              <Button
                className="bg-[#00e699] text-black rounded-md font-medium transition-all ease-in-out hover:bg-[#2a5a42] hover:text-white hover:-translate-y-2 w-full"
                type="submit"
              >
                Submit
              </Button>
            </div>
            {/* Submit Button div */}
          </form>
          {/* form div here */}
        </div>
      </main>
    </div>
  );
};

export default UpdateParcel;
