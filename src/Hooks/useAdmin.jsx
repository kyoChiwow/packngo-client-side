import useRole from "./useRole";

const useAdmin = () => {
    const [role, isRoleLoading] = useRole();
    const isAdmin = role === 'admin';

    return [isAdmin, isRoleLoading];
};

export default useAdmin;