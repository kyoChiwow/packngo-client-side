import { Button } from "@/components/ui/button";
import Title from "@/Shared/Title/Title";
import { useForm } from "react-hook-form";

const BookAPercel = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <header>
        <Title
          mainTitle="Book a percel"
          subTitle="Please fill out the form below to book a percel"
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
                    name="bookingPercelType"
                    {...register("bookingPercelType", { required: true })}
                  />
                  {errors.bookingPercelType && (
                    <span className="text-red-600 mt-2 ml-1">
                      Your Email is required
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
                    className="border rounded-md py-1 px-2 w-full"
                    placeholder="Enter Your Percel Weight"
                    name="bookingWeight"
                    {...register("bookingWeight", { required: true })}
                  />
                  {errors.bookingWeight && (
                    <span className="text-red-600 mt-2 ml-1">
                      Your Phone Number is required
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
                    name="bookingReceiverName"
                    {...register("bookingReceiverName", { required: true })}
                  />
                  {errors.bookingReceiversName && (
                    <span className="text-red-600 mt-2 ml-1">
                      Your Name is required
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
                    name="bookingReceiverNumber"
                    {...register("bookingReceiverNumber", { required: true })}
                  />
                  {errors.bookingReceiverNumber && (
                    <span className="text-red-600 mt-2 ml-1">
                      Your Phone Number is required
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
                    name="bookingReceiverAddress"
                    {...register("bookingReceiverAddress", { required: true })}
                  />
                  {errors.bookingReceiverAddress && (
                    <span className="text-red-600 mt-2 ml-1">
                      Your Name is required
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
                    name="bookingDeliveryDate"
                    {...register("bookingDeliveryDate", { required: true })}
                  />
                  {errors.bookingDeliveryDate && (
                    <span className="text-red-600 mt-2 ml-1">
                      Your Name is required
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
                    className="border rounded-md py-1 px-2 w-full"
                    placeholder="Enter Receiver's Latitude"
                    name="bookingAddressLatitute"
                    {...register("bookingAddressLatitute", { required: true })}
                  />
                  {errors.bookingAddressLatitute && (
                    <span className="text-red-600 mt-2 ml-1">
                      Your Name is required
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
                    className="border rounded-md py-1 px-2 w-full"
                    placeholder="Enter Receivers Longitude"
                    name="bookingAddressLongitude"
                    {...register("bookingAddressLongitude", { required: true })}
                  />
                  {errors.bookingAddressLongitude && (
                    <span className="text-red-600 mt-2 ml-1">
                      Your Name is required
                    </span>
                  )}
                </div>
                {/* Delivery Address Longitude div */}
              </div>
            </div>

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

export default BookAPercel;
