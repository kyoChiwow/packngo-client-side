import { SlCalender } from "react-icons/sl";
import { FaBox } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import { MdReviews } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import logo from "../../assets/images/logo/pack-n-go-logo-3_1_orig.png";
import PropTypes from "prop-types";
import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import useAuth from "@/Hooks/useAuth";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const menuItems = {
  generalUser: [
    {
      title: "Book A Percel",
      icon: <SlCalender />,
      url: "/dashboard/book-percel",
    },
    { title: "My Percels", icon: <FaBox />, url: "/dashboard/my-percels" },
    { title: "My Profile", icon: <CgProfile />, url: "/dashboard/my-profile" },
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
    {
      title: "All Delivery Mens",
      icon: <MdDeliveryDining />,
      url: "/dashboard/all-delivery-mens",
    },
    { title: "All Percels", icon: <FaBox />, url: "/dashboard/all-percels" },
    { title: "All Users", icon: <FaUser />, url: "/dashboard/all-users" },
    { title: "Statistics", icon: <IoIosStats />, url: "/dashboard/statistics" },
  ],
};

const Sidebar = ({ role }) => {
  const items = menuItems[role] || [];
  const { user } = useAuth();

  const [expandable, setExpandable] = useState(true);

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

            <div className="ml-14">
              <button
                onClick={() => setExpandable((current) => !current)}
                className="p-1 rounded-lg bg-gray-50 hover:bg-gray-100"
              >
                {expandable ? <ChevronFirst /> : <ChevronLast />}
              </button>
            </div>
          </div>

          <ul className="flex-1 px-3 py-3">
            {items.map((item, idx) => (
              <li key={idx}>
                <NavLink
                  to={item.url}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 p-2 font-medium hover:bg-gray-200 rounded-md bg-[#2a5a42] bg-opacity-30"
                      : "flex items-center gap-3 p-2 font-medium hover:bg-gray-200 rounded-md"
                  }
                >
                  {item.icon}
                  <span>{item.title}</span>
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
                <MoreVertical size={20} />
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
