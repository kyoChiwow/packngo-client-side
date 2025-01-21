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
import { NavLink } from "react-router-dom";

const MyPercels = () => {
  const [parcels, loading] = useParcels();

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <header>
        <Title
          mainTitle="My Parcels"
          subTitle="You will find all the parcel list below"
        ></Title>
      </header>

      <main className="p-4">
        {/* Table div */}
        <div className="lg:w-[80%] w-full flex flex-col items-center bg-white shadow-xl bg-opacity-60 p-4 rounded-md mx-auto">
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
            {parcels.map((parcel, idx) => (
              <TableBody key={idx}>
                <TableRow>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{parcel.bookingPercelType}</TableCell>
                  <TableCell>{parcel.bookingDeliveryDate}</TableCell>
                  <TableCell>{parcel.bookingDeliveryDate}</TableCell>
                  <TableCell>{parcel.createdAt}</TableCell>
                  <TableCell>{parcel.status}</TableCell>
                  <TableCell>
                    <NavLink to={`/dashboard/update-percels/${parcel._id}`}>
                      <Button className={"bg-[#00e699] bg-opacity-80"}>
                        <MdEdit />
                      </Button>
                    </NavLink>
                  </TableCell>
                  <TableCell>
                    <Button className={"bg-[#00e699] bg-opacity-80"}>
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
        {/* Table div */}
      </main>
    </div>
  );
};

export default MyPercels;
