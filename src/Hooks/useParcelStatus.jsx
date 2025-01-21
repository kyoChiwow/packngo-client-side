import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useParcelStatus = (status) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: parcels = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["parcels", status],
    queryFn: async () => {
      const endpoint = status ? `/parcels/sort?status=${status}` : "/parcels/sort";
      const res = await axiosSecure.get(endpoint);
      return res.data;
    },
    enabled: !!status,
  });
  return [parcels, loading, refetch];
};

export default useParcelStatus;
