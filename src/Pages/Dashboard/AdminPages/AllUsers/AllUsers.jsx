import useAxiosSecure from "@/Hooks/useAxiosSecure";
import Title from "@/Shared/Title/Title";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { RiAdminFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import { Button } from "@/components/ui/button";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axiosSecure.get(
        `/users?page=${currentPage}&limit=${limit}`
      );
      setUsers(res.data.users);
      setTotalUsers(res.data.tolalUsers);
    };
    fetchUsers();
  }, [axiosSecure, currentPage]);

  const handleRoleChange = async (userId, newRole) => {
    await axiosSecure.patch(`/update/${userId}`, { role: newRole });
    setUsers(
      users.map((user) =>
        user._id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  // Calculate the total page here
  const totalPages = Math.ceil(totalUsers / limit);

  return (
    <div>
      <header>
        <Title
          mainTitle="All Users"
          subTitle="Here you will see all the users that are registered on our platform"
        ></Title>
      </header>

      <main className="max-w-[90%] mx-auto">
        <div className="bg-white rounded-lg p-2">
          <Table>
            <TableCaption>A list of your booked parcels.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Parcels Booked</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Make Delivery Man</TableHead>
                <TableHead>Make Admin</TableHead>
                <TableHead>Make General User</TableHead>
              </TableRow>
            </TableHeader>
            {users.map((user, idx) => (
              <TableBody key={idx}>
                <TableRow>
                  <TableCell>{(currentPage - 1) * limit + idx + 1}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.phone || "N/A"}</TableCell>
                  <TableCell>{user.parcelsBooked}</TableCell>
                  <TableCell>{user.totalAmount} Tk</TableCell>
                  <TableCell>
                    <Button
                      disabled={user.role === "deliveryMan"}
                      onClick={() => handleRoleChange(user._id, "deliveryMan")}
                      className="bg-[#00e699] bg-opacity-80"
                    >
                      <MdDeliveryDining />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      disabled={user.role === "admin"}
                      onClick={() => handleRoleChange(user._id, "admin")}
                      className="bg-[#00e699] bg-opacity-80"
                    >
                      <RiAdminFill />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      disabled={user.role === "generalUser"}
                      onClick={() => handleRoleChange(user._id, "generalUser")}
                      className="bg-[#00e699] bg-opacity-80"
                    >
                      <FaUser />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
          {/* Pagination */}
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(index + 1);
                      }}
                      active={currentPage === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages)
                        setCurrentPage(currentPage + 1);
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AllUsers;
