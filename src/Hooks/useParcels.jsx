import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useParcels = (allParcels = false) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: parcels = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["parcels", allParcels ? "all" : user?.email],
    queryFn: async () => {
      const endpoint = allParcels ? "/parcels" : `/parcels/email/${user.email}`;
      const res = await axiosSecure.get(endpoint);
      return res.data;
    },
    enabled: !!user || allParcels,
  });
  return [parcels, loading, refetch];
};

export default useParcels;
