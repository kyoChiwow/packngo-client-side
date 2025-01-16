import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import loginAnimation from "../../assets/lottieAnimations/login.json";
import googleAnimation from "../../assets/lottieAnimations/google.json";
import Lottie from "lottie-react";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    
  }
  return (
    <div className="pt-[96px] bg-[#00e699] bg-opacity-10 min-h-screen">
      <div className="max-w-[90%] lg:max-w-[80%] mx-auto bg-[#2a5a42] bg-opacity-10 min-h-screen flex flex-col-reverse lg:flex-row items-center justify-between px-8 xl:px-[150px] py-2">
        {/* Form div here */}
        <div className="lg:w-[48%] w-full flex flex-col items-center bg-white shadow-xl bg-opacity-60 p-4 rounded-md">
          {/* Form header div here */}
          <div>
            <h1 className="text-3xl mb-8">Register Here!</h1>
          </div>
          {/* Form header div here */}
          {/* form div here */}
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            {/* Name div */}
            <div className="flex flex-col">
              <div>
                <p className="text-sm mb-1">Your Name :</p>
              </div>
              <input
                type="text"
                className="border rounded-md py-1 px-2 w-full"
                placeholder="Enter Your Name"
                name="registerName"
                {...register("registerName", { required: true })}
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
                name="registerEmail"
                {...register("registerEmail", { required: true })}
              />
              {errors.registerEmail && (
                <span className="text-red-600 mt-2 ml-1">
                  Your Email is required
                </span>
              )}
            </div>
            {/* Email div */}

            {/* Photo URL div */}
            <div className="mt-4 flex flex-col">
              <div>
                <p className="text-sm mb-1">Your Photo URL :</p>
              </div>
              <input
                type="text"
                className="border rounded-md py-1 px-2 w-full"
                placeholder="Enter Your Photo URL"
                name="registerPhoto"
                {...register("registerPhoto", { required: true })}
              />
              {errors.registerName && (
                <span className="text-red-600 mt-2 ml-1">
                  Your Photo URL is required
                </span>
              )}
            </div>
            {/* Photo URL div */}

            {/* Category select div */}
            <div className="mt-4 flex flex-col">
              <div>
                <p className="text-sm mb-1">Your Role :</p>
              </div>
              <select
                className="py-1 px-2 rounded-md border w-full"
                defaultValue="default"
                {...register("category", {
                  validate: (value) =>
                    value !== "default" || "Your Category is required",
                })}
              >
                <option disabled value="default">
                  Select A Category
                </option>
                <option value="generalUser">General User</option>
                <option value="deliveryMan">Delivery Man</option>
              </select>
              {errors.category && (
                <span className="text-red-600 mt-2 ml-1">
                  {errors.category.message}
                </span>
              )}
            </div>
            {/* Category select div */}

            {/* Password div */}
            <div className="mt-4 flex flex-col">
              <div>
                <p className="text-sm mb-1">Your Password :</p>
              </div>
              <input
                type="password"
                className="border rounded-md py-1 px-2 w-full"
                placeholder="Enter Your Password"
                name="registerPassword"
                {...register("registerPassword", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
                })}
              />
              {errors.registerPassword?.type === "required" && (
                <span className="text-red-600 mt-2 ml-1">
                  Password is required
                </span>
              )}
              {errors.registerPassword?.type === "minLength" && (
                <span className="text-red-600 mt-2 ml-1">
                  Password must be atleast 6 characters long!
                </span>
              )}
              {errors.registerPassword?.type === "maxLength" && (
                <span className="text-red-600 mt-2 ml-1">
                  Password must be less than 20 characters!
                </span>
              )}
              {errors.registerPassword?.type === "pattern" && (
                <span className="text-red-600 mt-2 ml-1">
                  Password must have 1 uppercase, 1 lowercase and 1 digit in it!
                </span>
              )}
            </div>
            {/* Password div */}

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

          {/* Google Login div */}
          <div className="mt-4 w-full">
            <Button className="bg-[#00e699] text-black rounded-md font-medium transition-all ease-in-out hover:bg-[#2a5a42] hover:text-white hover:-translate-y-2 w-full">
              <Lottie
                className="w-[30px]"
                animationData={googleAnimation}
              ></Lottie>
              <span className="mr-8">Login With Google</span>
            </Button>
          </div>
          {/* Google Login div */}
        </div>
        {/* Form div here */}

        {/* Animation div here */}
        <div className="w-[48%]">
          <Lottie
            className="lg:w-[350px] xl:w-[600px]"
            animationData={loginAnimation}
          ></Lottie>
        </div>
        {/* Animation div here */}
      </div>
    </div>
  );
};

export default Register;
