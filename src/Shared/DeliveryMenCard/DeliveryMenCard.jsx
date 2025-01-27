import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import Title from "../Title/Title";

const DeliveryMenCard = () => {
  const [deliveryMen, setDeliveryMen] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get("/topDeliveryMen").then((res) => setDeliveryMen(res.data));
  }, [axiosPublic]);

  return (
    <div className="p-6">
      <header>
        <Title
        mainTitle="Top Delivery Men"
        subTitle="Our Three Top Delivery Men"
        />
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {deliveryMen.map((man) => (
          <div
            key={man._id}
            className="bg-gray-100 shadow-lg rounded-lg p-4 flex flex-col items-center hover:scale-105 transition-all duration-300"
          >
            <img
              src={man.image}
              alt={man.name}
              className="rounded-full object-cover w-20 h-20 mb-4"
            />
            <h3 className="text-lg font-semibold">{man.name}</h3>
            <p className="text-gray-600">
              Parcels Delivered:{" "}
              <span className="font-bold">{man.parcelsDelivered}</span>
            </p>
            <p className="text-yellow-500">
              Average Rating:{" "}
              <span className="font-bold">{man.averageRating}</span>/5
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryMenCard;
