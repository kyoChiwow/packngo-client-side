import { useEffect, useState } from "react";
import CountUp from "react-countup";
import useAxiosPublic from "@/Hooks/useAxiosPublic";

const Statistics = () => {
  const [totalParcels, setTotalParcels] = useState(0);
  const [deliveredParcels, setDeliveredParcels] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    // Fetch the total number of parcels
    axiosPublic.get("/allParcels").then((res) => {
      setTotalParcels(res.data.length);
    });

    // Fetch the delivered parcels count
    axiosPublic.get("/delivered").then((res) => {
      setDeliveredParcels(res.data.length);
    });

    // Fetch the total number of registered users
    axiosPublic.get("/allUsers").then((res) => {
      setTotalUsers(res.data.length);
    });
  }, [axiosPublic]);

  return (
    <div>
      <main className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Total Parcels Booked Card */}
          <div className="bg-blue-500 hover:scale-105 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold text-center">
              Total Parcels Booked
            </h3>
            <div className="flex justify-center items-center mt-4 text-4xl font-bold">
              <CountUp
                start={0}
                end={totalParcels}
                duration={2.5}
                separator=","
              />
            </div>
          </div>

          {/* Total Parcels Delivered Card */}
          <div className="bg-green-500 hover:scale-105 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold text-center">
              Total Parcels Delivered
            </h3>
            <div className="flex justify-center items-center mt-4 text-4xl font-bold">
              <CountUp
                start={0}
                end={deliveredParcels}
                duration={2.5}
                separator=","
              />
            </div>
          </div>

          {/* Total Users Card */}
          <div className="bg-purple-500 hover:scale-105 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold text-center">
              Total Users Registered
            </h3>
            <div className="flex justify-center items-center mt-4 text-4xl font-bold">
              <CountUp
                start={0}
                end={totalUsers}
                duration={2.5}
                separator=","
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Statistics;
