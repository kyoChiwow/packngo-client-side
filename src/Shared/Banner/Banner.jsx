import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import riderAnimation from "../../assets/lottieAnimations/delivery-boy.json"
import Lottie from "lottie-react";

const Banner = () => {
  return (
    <div className="relative pt-[100px] bg-[url('/src/assets/images/bannerbg/bannerBg.jpg')] h-[800px] bg-cover bg-no-repeat bg-fixed">
      {/* Black overlay here */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
      {/* Black overlay here */}
      <div className="relative z-10 max-w-[90%] lg:max-w-[80%] mx-auto flex flex-col justify-center h-full">
        {/* Animation div */}
        <div className="flex justify-center">
            <Lottie className="w-[350px]" animationData={riderAnimation}></Lottie>
        </div>
        {/* Animation div */}
        {/* header info div */}
        <div>
          <h1 className="text-white text-center text-5xl font-bold">
            Welcome To PackNGO
          </h1>
          <p className="text-center mt-4 text-white text-lg font-semibold">
            Where your shipments meet precision. <br />
            Reliable. Trackable. Unstoppable.
          </p>
        </div>
        {/* header info div */}

        {/* Search bar div */}
        <div className="flex justify-center mt-4">
          <div className="flex w-full max-w-xl items-center space-x-2">
            <Input type="text" />
            <Button className="bg-[#00e699] text-black rounded-lg font-medium transition-all ease-in-out hover:bg-[#2a5a42] hover:text-white hover:-translate-y-2" type="submit">Submit</Button>
          </div>
        </div>
        {/* Search bar div */}
      </div>
    </div>
  );
};

export default Banner;
