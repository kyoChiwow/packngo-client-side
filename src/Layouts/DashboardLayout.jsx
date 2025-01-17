import useAdmin from "@/Hooks/useAdmin";
import useDeliveryMan from "@/Hooks/useDeliveryMan";
import useGeneralUser from "@/Hooks/useGeneralUser";
import Loading from "@/Pages/Loading/Loading";


const DashboardLayout = () => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isGeneralUser, isGeneralUserLoading] = useGeneralUser();
    const [isDeliveryMan, isDeliveryManLoading] = useDeliveryMan();

    if(isAdminLoading || isGeneralUserLoading || isDeliveryManLoading) {
        return <Loading></Loading>;
    }


    return (
        <div>
            {isAdmin && <p>admin here</p> }
            {isGeneralUser && <p>general user</p> }
            {isDeliveryMan && <p>delivery man here</p> }
        </div>
    );
};

export default DashboardLayout;