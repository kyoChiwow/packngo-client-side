import useAuth from "@/Hooks/useAuth";
import useGeneralUser from "@/Hooks/useGeneralUser";
import Loading from "@/Pages/Loading/Loading";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

const UserRoute = ({ children }) => {
  const [isGeneralUser, isGeneralUserLoading] = useGeneralUser();
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading || isGeneralUserLoading) {
    return <Loading></Loading>;
  }

  if (user && isGeneralUser) {
    return children;
  }

  return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
};

UserRoute.propTypes = {
    children: PropTypes.node.isRequired,
}
export default UserRoute;
