import useParcels from "@/Hooks/useParcels";
import Loading from "@/Pages/Loading/Loading";
import Title from "@/Shared/Title/Title";
import { Button } from "@/components/ui/button";
import { MdOutlineRateReview } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavLink } from "react-router-dom";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import useParcelStatus from "@/Hooks/useParcelStatus";

const MyPercels = () => {
  const [parcels, loading, refetch] = useParcels();
  const [sortStatus, setSortStatus] = useState("");
  const [sortedParcels, sortedLoading, sortedRefetch] = useParcelStatus(sortStatus);
  const axiosSecure = useAxiosSecure();

  if (loading || sortedLoading) {
    return <Loading></Loading>;
  }
  

  const handleSort = async (status) => {
    setSortStatus(status);
    sortedRefetch();
  };

  const handleCancel = async (parcelId, status) => {
    if (status !== "pending") {
      Swal.fire({
        title: "Error!",
        text: "You can only cancel parcels with a 'pending' status!",
        icon: "error",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    });
    if (result.isConfirmed) {
      const res = await axiosSecure.patch(`/parcels/${parcelId}`, {
        status: "canceled",
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Canceled!",
          text: "Your parcel has been successfully canceled.",
          icon: "success",
        });
        refetch();
      }
    }
  };

  const displayParcels = sortStatus ? sortedParcels: parcels;

  return (
    <div>
      <header>
        <Title
          mainTitle="My Parcels"
          subTitle="You will find all the parcel list below"
        ></Title>
      </header>

      <main className="max-w-[90%] mx-auto">
        {/* Table div */}
        <div>
          <div className="flex lg:w-[80%] mx-auto mb-4 justify-end">
            <div className="bg-white lg:w-[7%] rounded-sm text-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-white text-black border-none shadow-none w-full hover:text-white">
                    Sort By
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="p-0">
                    <button onClick={() => handleSort("")} className="w-full text-left h-full p-2 transition-all duration-300 rounded-t-sm hover:bg-gray-100">
                      All Parcels
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="p-0">
                    <button onClick={() => handleSort("pending")} className="w-full text-left h-full p-2 transition-all duration-300 hover:bg-gray-100">
                      Pending
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="p-0">
                    <button onClick={() => handleSort("delivered")} className="w-full text-left h-full p-2 transition-all duration-300 hover:bg-gray-100">
                      Delivered
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="p-0">
                    <button onClick={() => handleSort("canceled")} className="w-full text-left h-full p-2 transition-all duration-300 hover:bg-gray-100 rounded-b-sm">
                      Canceled
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="lg:w-[80%] w-full bg-white shadow-xl bg-opacity-60 p-4 rounded-md mx-auto">
            <Table>
              <TableCaption>A list of your booked parcels.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Parcel Type</TableHead>
                  <TableHead>Requested Delivery Date</TableHead>
                  <TableHead>Approximate Delivery Date</TableHead>
                  <TableHead>Booking Date and Time</TableHead>
                  <TableHead>Booking Status</TableHead>
                  <TableHead>Update</TableHead>
                  <TableHead>Cancel</TableHead>
                  <TableHead>Review</TableHead>
                  <TableHead>Pay</TableHead>
                </TableRow>
              </TableHeader>
              {displayParcels.map((parcel, idx) => (
                <TableBody key={idx}>
                  <TableRow>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{parcel.bookingPercelType}</TableCell>
                    <TableCell>{parcel.bookingDeliveryDate}</TableCell>
                    <TableCell>{parcel.bookingDeliveryDate}</TableCell>
                    <TableCell>{parcel.createdAt}</TableCell>
                    <TableCell>{parcel.status}</TableCell>
                    <TableCell>
                      {parcel.status === "pending" ? (
                        <NavLink to={`/dashboard/update-percels/${parcel._id}`}>
                          <Button className={"bg-[#00e699] bg-opacity-80"}>
                            <MdEdit />
                          </Button>
                        </NavLink>
                      ) : (
                        <Button
                          className={"bg-[#00e699] bg-opacity-80"}
                          disabled
                        >
                          <MdEdit />
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleCancel(parcel._id, parcel.status)}
                        className={"bg-[#00e699] bg-opacity-80"}
                      >
                        <MdCancel />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button className={"bg-[#00e699] bg-opacity-80"}>
                        <MdOutlineRateReview />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button className={"bg-[#00e699] bg-opacity-80"}>
                        <RiMoneyDollarCircleFill />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
            </Table>
          </div>
        </div>

        {/* Table div */}
      </main>
    </div>
  );
};

export default MyPercels;
