import { SlCalender } from "react-icons/sl";
import { FaBox } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import { MdReviews } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import logo from "../../assets/images/logo/pack-n-go-logo-3_1_orig.png";
import PropTypes from "prop-types";
import { ChevronFirst, ChevronLast, LogOut, MoreVertical } from "lucide-react";
import useAuth from "@/Hooks/useAuth";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const menuItems = {
  generalUser: [
    { title: "My Profile", icon: <CgProfile />, url: "/dashboard/my-profile" },
    { title: "My Percels", icon: <FaBox />, url: "/dashboard/my-percels" },
    {
      title: "Book A Percel",
      icon: <SlCalender />,
      url: "/dashboard/book-percel",
    },
  ],
  deliveryMan: [
    {
      title: "My Delivery List",
      icon: <MdDeliveryDining />,
      url: "/dashboard/my-delivery",
    },
    { title: "My Reviews", icon: <MdReviews />, url: "/dashboard/my-reviews" },
  ],
  admin: [
    { title: "Statistics", icon: <IoIosStats />, url: "/dashboard/statistics" },
    {
      title: "All Delivery Mens",
      icon: <MdDeliveryDining />,
      url: "/dashboard/all-delivery-mens",
    },
    { title: "All Percels", icon: <FaBox />, url: "/dashboard/all-percels" },
    { title: "All Users", icon: <FaUser />, url: "/dashboard/all-users" },
  ],
};

const Sidebar = ({ role }) => {
  const items = menuItems[role] || [];
  const { user, logOut } = useAuth();

  const [expandable, setExpandable] = useState(true);

  const handleLogOut = () => {
    logOut();
  };

  return (
    <div>
      <aside className="h-screen">
        <nav className="h-full flex flex-col bg-[#00e699] bg-opacity-40 border-r shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center border-b">
            <div
              className={`overflow-hidden transition-all flex items-center gap-2 ${
                expandable ? "w-[170px]" : "w-0"
              }`}
            >
              <div>
                <img
                  className="rounded-lg"
                  src={logo}
                  alt="Website logo here"
                />
              </div>
            </div>

            <div>
              <button
                onClick={() => setExpandable((current) => !current)}
                className="p-1 rounded-lg bg-gray-50 hover:bg-gray-100"
              >
                {expandable ? <ChevronFirst /> : <ChevronLast />}
              </button>
            </div>
          </div>

          <ul className="flex-1 px-[15px] py-3">
            {items.map((item, idx) => (
              <li key={idx} className="relative group">
                <NavLink
                  to={item.url}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 p-2 font-medium hover:bg-[#2a5a42] hover:bg-opacity-20 rounded-md bg-[#2a5a42] bg-opacity-30 mt-4 transition-all"
                      : "flex items-center gap-3 p-2 font-medium hover:bg-[#2a5a42] hover:bg-opacity-20 rounded-md mt-4 transition-all"
                  }
                >
                  {item.icon}
                  <span
                    className={`overflow-hidden transition-all ${
                      expandable ? "visible" : "hidden"
                    }`}
                  >
                    {item.title}
                  </span>
                  {!expandable && (
                    <div
                      className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap`}
                    >
                      {item.title}
                    </div>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="border-t flex p-3">
            <img
              className="w-10 h-10 rounded-lg"
              src={user.photoURL}
              alt={user.displayName}
            />
            <div
              className={`flex justify-between items-center overflow-hidden transition-all ${
                expandable ? "w-52 ml-3" : "w-0"
              }`}
            >
              <div className="leading-4">
                <h4 className="font-semibold">{user.displayName}</h4>
                <span className="text-xs">{user.email}</span>
              </div>

              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    asChild
                    className="rounded-full hover:cursor-pointer transform transition-transform duration-300 hover:scale-125"
                  >
                    <MoreVertical size={20} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>{user.displayName}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <NavLink className={"w-full"} to={"/"}>Go Back Home</NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogOut}
                      className="hover:cursor-pointer"
                    >
                      <LogOut />
                      <button>Log out</button>
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </nav>
      </aside>
    </div>
  );
};

Sidebar.propTypes = {
  role: PropTypes.string.isRequired,
};
export default Sidebar;
