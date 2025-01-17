import useAuth from "@/Hooks/useAuth";
import useDeliveryMan from "@/Hooks/useDeliveryMan";
import Loading from "@/Pages/Loading/Loading";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

const DeliveryRoute = ({ children }) => {
    const [ isDeliveryMan, isDeliveryManLoading] = useDeliveryMan();
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading || isDeliveryManLoading) {
        return <Loading></Loading>
    }

    if (user && isDeliveryMan) {
        return children;
    }

    return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>
};

DeliveryRoute.propTypes = {
    children: PropTypes.node.isRequired,
}
export default DeliveryRoute;