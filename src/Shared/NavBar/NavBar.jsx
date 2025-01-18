import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo/logo.webp";
import { FaBell } from "react-icons/fa";
import useAuth from "@/Hooks/useAuth";
import {
  LifeBuoy,
  LogOut,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useAdmin from "@/Hooks/useAdmin";
import useDeliveryMan from "@/Hooks/useDeliveryMan";
import useGeneralUser from "@/Hooks/useGeneralUser";

const NavBar = () => {
  const { user, logOut } = useAuth();
  const [isAdmin] = useAdmin();
  const [isDeliveryMan] = useDeliveryMan();
  const [isGeneralUser] = useGeneralUser();

  const navigate = useNavigate();

  const handleDashboardRedirect = () => {
    if (isAdmin) {
      navigate("/dashboard/statistics")
    }
    else if (isGeneralUser) {
      navigate("/dashboard/my-profile")
    }
    else if (isDeliveryMan) {
      navigate("/dashboard/my-delivery")
    }
  }

  const handleLogOut = () => {
    logOut();
  }
  
  return (
    <div className="fixed z-10 bg-[#2a5a42] bg-opacity-50 w-full backdrop-blur-sm">
      {/* Navbar wrapping div */}
      <div className="max-w-[90%] lg:max-w-[80%] mx-auto flex justify-between items-center py-2 z-20">
        {/* Image div */}
        <NavLink to={"/"}>
          <img className="w-[80px] h-[80px] rounded-full" src={logo} alt="" />
        </NavLink>
        {/* Image div */}

        {/* NavLinks and notification wrapping div */}
        <div className="flex items-center gap-4">
          {/* Navlink div */}
          <div className="transform transition-all duration-300 hover:-translate-y-2">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "bg-[#00e699] p-2 rounded-lg font-medium transition-all ease-in-out hover:bg-[#2a5a42] hover:text-white"
                  : "bg-transparent p-2 rounded-lg font-medium transition-all ease-in-out hover:bg-[#2a5a42] hover:text-white"
              }
            >
              HOME
            </NavLink>
          </div>
          {/* Navlink div */}

          {/* Notification div */}
          <div className="transform transition-transform duration-300 hover:-translate-y-2 rounded-full p-3 bg-[#00e699] hover:bg-[#2a5a42] hover:cursor-pointer hover:text-white">
            <FaBell></FaBell>
          </div>
          {/* Notification div */}

          {/* Login or avatar dropdown div */}
          <div>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="rounded-full hover:cursor-pointer transform transition-transform duration-300 hover:scale-125">
                  <img className="w-[40px] h-[40px] object-cover" src={user.photoURL} alt="" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>{user.displayName}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LifeBuoy />
                    <button onClick={handleDashboardRedirect}>Dashboard</button>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut />
                    <button onClick={handleLogOut}>Log out</button>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="transform transition-all duration-300 hover:-translate-y-2">
                <NavLink
                  to={"/login"}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#00e699] p-2 rounded-lg font-medium transition-all ease-in-out hover:bg-[#2a5a42] hover:text-white"
                      : "bg-transparent p-2 rounded-lg font-medium transition-all ease-in-out hover:bg-[#2a5a42] hover:text-white"
                  }
                >
                  LOGIN
                </NavLink>
              </div>
            )}
          </div>
          {/* Login or avatar dropdown div */}
        </div>
        {/* NavLinks and notfication wrapping div */}
      </div>
      {/* Navbar wrapping div */}
    </div>
  );
};

export default NavBar;
