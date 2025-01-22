import { Button } from "@/components/ui/button";
import useAuth from "@/Hooks/useAuth";
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import googleAnimation from "../../assets/lottieAnimations/google.json";
import Swal from "sweetalert2";
import loginAnimation from "../../assets/lottieAnimations/login.json";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loginEmail } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    loginEmail(data.loginEmail, data.loginPassword)
      .then((res) => {
        const loggedUser = res.user;
        console.log(loggedUser);
        Swal.fire({
          title: "Good job!",
          text: "You have successfully logged into your account!",
          icon: "success",
        });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: `Something went wrong ${err.message}`,
          icon: "error",
        });
      });
  };
  return (
    <div className="pt-[96px] bg-[#00e699] bg-opacity-10 min-h-screen">
      <div className="max-w-[90%] lg:max-w-[80%] mx-auto bg-[#2a5a42] bg-opacity-10 min-h-screen flex flex-col-reverse lg:flex-row-reverse items-center justify-between px-8 xl:px-[150px] py-2">
        {/* Form div here */}
        <div className="lg:w-[48%] w-full flex flex-col items-center bg-white shadow-xl bg-opacity-60 p-4 rounded-md">
          {/* Form header div here */}
          <div>
            <h1 className="text-3xl mb-8">Login Here!</h1>
          </div>
          {/* Form header div here */}
          {/* form div here */}
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            {/* Email div */}
            <div className="mt-4 flex flex-col">
              <div>
                <p className="text-sm mb-1">Your Email :</p>
              </div>
              <input
                type="email"
                className="border rounded-md py-1 px-2 w-full"
                placeholder="Enter Your Email"
                name="loginEmail"
                {...register("loginEmail", { required: true })}
              />
              {errors.registerEmail && (
                <span className="text-red-600 mt-2 ml-1">
                  Your Email is required
                </span>
              )}
            </div>
            {/* Email div */}

            {/* Password div */}
            <div className="mt-4 flex flex-col">
              <div>
                <p className="text-sm mb-1">Your Password :</p>
              </div>
              <input
                type="password"
                className="border rounded-md py-1 px-2 w-full"
                placeholder="Enter Your Password"
                name="loginPassword"
                {...register("loginPassword", {
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

          {/* Already have an account div */}
          <div className="mt-4">
            <p>
              Do not have an account?{" "}
              <NavLink to={"/register"}>
                <span className="text-[#38a581] font-bold">Register Here!</span>
              </NavLink>{" "}
            </p>
          </div>
          {/* Already have an account div */}
        </div>
        {/* Form div here */}

        {/* Animation div here */}
        <div className="w-[48%]">
          <Lottie
            animationData={loginAnimation}
            className="lg:w-[350px] xl:w-[600px]"
          ></Lottie>
        </div>
        {/* Animation div here */}
      </div>
    </div>
  );
};

export default Login;
