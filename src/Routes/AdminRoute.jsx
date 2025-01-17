import useAdmin from "@/Hooks/useAdmin";
import useAuth from "@/Hooks/useAuth";
import Loading from "@/Pages/Loading/Loading";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const [ isAdmin, isAdminLoading ] = useAdmin();
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <Loading></Loading>;
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>
};

AdminRoute.propTypes = {
    children: PropTypes.node.isRequired,
}
export default AdminRoute;