import useAxiosSecure from "@/Hooks/useAxiosSecure";
import Loading from "@/Pages/Loading/Loading";
import Title from "@/Shared/Title/Title";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const Statistics = () => {
  const axiosSecure = useAxiosSecure();
  const [barChartData, setBarChartData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [chartOptions, setChartOptions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParcelData = async () => {
      const response = await axiosSecure.get("/parcels");
      const parcelCollection = response.data;

      // Grouping by date
      const groupedByDate = parcelCollection.reduce((acc, parcel) => {
        const date = parcel.createdAt.split(" ")[0];
        if (!acc[date]) {
          acc[date] = { booked: 0, delivered: 0, canceled: 0 };
        }

        acc[date].booked += 1;
        if (parcel.status === "delivered") acc[date].delivered += 1;
        if (parcel.status === "canceled") acc[date].canceled += 1;
        return acc;
      }, {});

      // Data for the charts here
      const dates = Object.keys(groupedByDate);
      const bookings = dates.map((date) => groupedByDate[date].booked);
      const deliveries = dates.map((date) => groupedByDate[date].delivered);

      setBarChartData({
        categories: dates,
        series: [{ name: "Bookings", data: bookings }],
      });

      setLineChartData({
        categories: dates,
        series: [
          { name: "Booked Parcels", data: bookings },
          { name: "Delivered Parcels", data: deliveries },
        ],
      });

      setChartOptions({
        xaxis: {
          categories: dates,
          title: { text: "Dates" },
        },
        yaxis: {
          title: { text: "Count" },
        },
        toolbar: {
          show: true,
        },
      });
      setLoading(false);
    };
    fetchParcelData();
  }, [axiosSecure]);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <header>
        <Title
          mainTitle="Statistics"
          subTitle="Below is the statistics of PackNGO, take a look to plan your next campaign!"
        ></Title>
      </header>

      <main className="p-4">
        <div className="lg:w-[80%] w-full bg-white shadow-xl bg-opacity-60 p-4 rounded-md mx-auto">
          <h2 className="text-lg font-bold mb-4">Bookings by Date</h2>
          <Chart
            options={{
              chart: { type: "bar" },
              xaxis: { categories: barChartData.categories },
              yaxis: { title: { text: "Count" } },
            }}
            series={barChartData.series}
            type="bar"
            height={350}
          />

          <h2 className="text-lg font-bold mt-8 mb-4">
            Booked vs Delivered Parcels
          </h2>
          <Chart
            options={{
              chart: { type: "line" },
              xaxis: { categories: lineChartData.categories },
              yaxis: { title: { text: "Count" } },
            }}
            series={lineChartData.series}
            type="line"
            height={350}
          />
        </div>
      </main>
    </div>
  );
};

export default Statistics;
