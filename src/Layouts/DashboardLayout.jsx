import useAdmin from "@/Hooks/useAdmin";
import useDeliveryMan from "@/Hooks/useDeliveryMan";
import useGeneralUser from "@/Hooks/useGeneralUser";
import Loading from "@/Pages/Loading/Loading";
import Sidebar from "@/Shared/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const [isGeneralUser, isGeneralUserLoading] = useGeneralUser();
  const [isDeliveryMan, isDeliveryManLoading] = useDeliveryMan();

  if (isAdminLoading || isGeneralUserLoading || isDeliveryManLoading) {
    return <Loading></Loading>;
  }

  // Setting up the role here to pass as a prop
  let role = "generalUser";

  if (isGeneralUser) {
    role = "generalUser";
  }
  if (isAdmin) {
    role = "admin";
  }
  if (isDeliveryMan) {
    role = "deliveryMan";
  }

  return (
    <div className="flex">
      <div>
        <Sidebar role={role}></Sidebar>
      </div>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default DashboardLayout;
