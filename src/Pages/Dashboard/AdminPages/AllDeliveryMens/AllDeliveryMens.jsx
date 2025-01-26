import useAxiosSecure from "@/Hooks/useAxiosSecure";
import Title from "@/Shared/Title/Title";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

const AllDeliveryMens = () => {
  const [deliveryMens, setDeliveryMens] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchDeliveryMens = async () => {
        const res = await axiosSecure.get("/delivery-count");
        setDeliveryMens(res.data)
    }
    fetchDeliveryMens();
  }, [axiosSecure])

  return (
    <div>
      <header>
        <Title
          mainTitle="All Delivery Mens"
          subTitle="Below you will find all the delivery mens that we have under our employment"
        ></Title>
      </header>

      <main className="max-w-[90%] mx-auto">
        <div className="bg-white rounded-lg p-2">
          <Table>
            <TableCaption>A list of your booked parcels.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Delivery Mans Name</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Number Of Parcels Delivered</TableHead>
                <TableHead>Average Review</TableHead>
              </TableRow>
            </TableHeader>
            {deliveryMens.map((man, idx) => (
              <TableBody key={idx}>
                <TableRow>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{man.name}</TableCell>
                  <TableCell>{man.phone}</TableCell>
                  <TableCell>{man.parcelsDelivered}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </div>
      </main>
    </div>
  );
};

export default AllDeliveryMens;
