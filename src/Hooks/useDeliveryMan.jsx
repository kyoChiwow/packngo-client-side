import useRole from "./useRole";

const useDeliveryMan = () => {
    const [role, isRoleLoading] = useRole();
    const isDeliveryMan = role === "deliveryMan";

    return [isDeliveryMan, isRoleLoading];
};

export default useDeliveryMan;