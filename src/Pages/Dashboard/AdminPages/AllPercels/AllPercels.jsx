import useAxiosSecure from "@/Hooks/useAxiosSecure";
import useParcels from "@/Hooks/useParcels";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FaGear } from "react-icons/fa6";
import Title from "@/Shared/Title/Title";
import Loading from "@/Pages/Loading/Loading";

const AllPercels = () => {
  const [parcels, loading, refetch] = useParcels(true);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [searchResults, setSearchResults] = useState(parcels);
  const [deliveryMen, setDeliveryMen] = useState([]);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const axiosSecure = useAxiosSecure();

  // Fetching delivery man
  const { data: deliveryMenList = [] } = useQuery({
    queryKey: ["deliveryMen"],
    queryFn: async () => {
      const res = await axiosSecure.get("/delivery-men");
      return res.data;
    },
  });
  // Fetching delivery man

  const handleManageClick = (parcel) => {
    setSelectedParcel(parcel);
    setDeliveryMen(deliveryMenList);
  };

  const handleAssign = async (deliveryManId, approxDate) => {
    await axiosSecure.patch(`/parcels/update/${selectedParcel._id}`, {
      status: "On the way",
      deliveryManId,
      deliveryDate: approxDate,
    });
    refetch();
    setSelectedParcel(null);
  };

  const handleSearch = async () => {
    if (!dateRange.from || !dateRange.to) {
      return;
    }

    try {
      // Send a GET request with formatted date parameters
      const res = await axiosSecure.get("/search", {
        params: {
          from: dateRange.from,
          to: dateRange.to,
        },
      });
      setSearchResults(res.data);
      refetch();
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  useEffect(() => {
    if (parcels) {
      setSearchResults(parcels);
    }
  }, [parcels]);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <header>
        <Title
          mainTitle="All Parcels"
          subTitle="You will find all the parcels booked by users below"
        ></Title>
      </header>
      <main className="max-w-[90%] mx-auto">
        {/* Date Range Search */}
        <div className="mb-4 flex flex-col md:flex-row gap-4 md:space-x-4 md:items-center md:justify-end">
          <div>
            <p className="font-bold mb-2">From :</p>
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) =>
                setDateRange({ ...dateRange, from: e.target.value })
              }
              className="rounded-md p-2 cursor-pointer"
            />
          </div>
          <div>
            <p className="font-bold mb-2">To : </p>
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) =>
                setDateRange({ ...dateRange, to: e.target.value })
              }
              className="rounded-md p-2 cursor-pointer"
            />
          </div>
          <div className="md:mt-[29px]">
            <Button
              className="bg-[#00e699] bg-opacity-80"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        </div>

        {/* Parcels Table */}
        <div className="bg-white rounded-lg p-2">
          <Table>
            <TableCaption>A list of your booked parcels.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Parcel Type</TableHead>
                <TableHead>Booking Phone</TableHead>
                <TableHead>Booking Date</TableHead>
                <TableHead>Requested Delivery Date</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Booking Status</TableHead>
                <TableHead>Manage</TableHead>
              </TableRow>
            </TableHeader>
            {searchResults.map((parcel, idx) => (
              <TableBody key={idx}>
                <TableRow>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{parcel.bookingName}</TableCell>
                  <TableCell>{parcel.bookingPhone}</TableCell>
                  <TableCell>
                    {new Date(parcel.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{parcel.bookingDeliveryDate}</TableCell>
                  <TableCell>{parcel.price} Tk</TableCell>
                  <TableCell>{parcel.status}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleManageClick(parcel)}
                      className="bg-[#00e699] bg-opacity-80"
                    >
                      <FaGear />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </div>

        {/* Modal */}
        {selectedParcel && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg max-w-lg w-full">
              <h3 className="font-bold text-lg">
                Assign Delivery for {selectedParcel.bookingName}
              </h3>
              <select
                className="bg-gray-100 p-2 rounded-md cursor-pointer hover:bg-slate-200 duration-300 transition-all w-full mt-4"
                value={selectedParcel.deliveryManId || ""}
                onChange={(e) =>
                  setSelectedParcel({
                    ...selectedParcel,
                    deliveryManId: e.target.value,
                  })
                }
              >
                <option value="" disabled>
                  Select Delivery Man
                </option>
                {deliveryMen.map((man) => (
                  <option key={man._id} value={man._id}>
                    {man.name}
                  </option>
                ))}
              </select>
              <input
                type="date"
                className="bg-gray-100 p-2 rounded-md cursor-pointer hover:bg-slate-200 duration-300 transition-all w-full mt-4"
                value={selectedParcel.deliveryDate || ""}
                onChange={(e) =>
                  setSelectedParcel({
                    ...selectedParcel,
                    deliveryDate: e.target.value,
                  })
                }
              />
              <div className="mt-4 flex justify-end space-x-2">
                <Button
                  className="bg-[#00e699] bg-opacity-80"
                  onClick={() =>
                    handleAssign(
                      selectedParcel.deliveryManId,
                      selectedParcel.deliveryDate
                    )
                  }
                >
                  Assign
                </Button>
                <Button
                  className="bg-[#00e699] bg-opacity-80"
                  onClick={() => setSelectedParcel(null)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AllPercels;
