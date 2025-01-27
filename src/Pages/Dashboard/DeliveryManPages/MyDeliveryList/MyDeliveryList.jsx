import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import Loading from "@/Pages/Loading/Loading";
import Title from "@/Shared/Title/Title";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
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
import { FaMapLocation } from "react-icons/fa6";
import { MdCancel, MdDeliveryDining } from "react-icons/md";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MyDeliveryList = () => {
  const { user } = useAuth();
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchParcels = async () => {
      const res = await axiosSecure.get("/deliveryman/parcels", {
        params: { email: user.email },
      });
      setParcels(res.data);
      setLoading(false);
    };
    fetchParcels();
  }, [axiosSecure, user.email]);

  const updateParcelStatus = async (id, status) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to update the status!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.patch(`/deliveryman/update/${id}`, { status });
        setParcels((prev) =>
          prev.map((parcel) =>
            parcel._id === id ? { ...parcel, status } : parcel
          )
        );
        Swal.fire({
          title: "Updated!",
          text: "Status has been changed.",
          icon: "success",
        });
      }
    });
  };

  const handleLocation = (lat, lng) => {
    setLocation({ lat, lng });
    setIsMapOpen(true);
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <header>
        <Title
          mainTitle="My Delivery List"
          subTitle="You can find your delivery list below"
        ></Title>
      </header>

      <main className="max-w-[90%] mx-auto">
        <div className="bg-white rounded-lg p-2">
          <Table>
            <TableCaption>A list of your booked parcels.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Booked Users Name</TableHead>
                <TableHead>Receivers Name</TableHead>
                <TableHead>Booked Users Phone</TableHead>
                <TableHead>Requested Delivery Date</TableHead>
                <TableHead>Approximate Delivery Date</TableHead>
                <TableHead>Receivers Phone Number</TableHead>
                <TableHead>Receivers Address</TableHead>
                <TableHead>View Location</TableHead>
                <TableHead>Cancel</TableHead>
                <TableHead>Deliver</TableHead>
              </TableRow>
            </TableHeader>
            {parcels.map((parcel, idx) => (
              <TableBody key={idx}>
                <TableRow>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{parcel.bookingName}</TableCell>
                  <TableCell>{parcel.bookingReceiverName}</TableCell>
                  <TableCell>{parcel.bookingPhone}</TableCell>
                  <TableCell>{parcel.bookingDeliveryDate}</TableCell>
                  <TableCell>{parcel.deliveryDate}</TableCell>
                  <TableCell>{parcel.bookingReceiverNumber}</TableCell>
                  <TableCell>{parcel.bookingReceiverAddress}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() =>
                        handleLocation(
                          parcel.bookingAddressLatitute,
                          parcel.bookingAddressLongitude
                        )
                      }
                      className="bg-[#00e699] bg-opacity-80"
                    >
                      <FaMapLocation />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      disabled={parcel.status === "canceled"}
                      onClick={() => updateParcelStatus(parcel._id, "canceled")}
                      className="bg-[#00e699] bg-opacity-80"
                    >
                      <MdCancel />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      disabled={parcel.status === "delivered"}
                      onClick={() =>
                        updateParcelStatus(parcel._id, "delivered")
                      }
                      className="bg-[#00e699] bg-opacity-80"
                    >
                      <MdDeliveryDining />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
          {/* Modal */}
          {isMapOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-4 rounded-lg w-[80%] max-w-3xl">
                <Button
                  className="absolute top-2 right-2 text-xl bg-[#00e699] bg-opacity-80"
                  onClick={() => setIsMapOpen(false)}
                >
                  X
                </Button>
                <MapContainer
                  center={[location.lat, location.lng]}
                  zoom={13}
                  style={{ height: "400px", width: "100%" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[location.lat, location.lng]}>
                    <Popup>
                      Location: {location.lat}, {location.lng}
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyDeliveryList;
