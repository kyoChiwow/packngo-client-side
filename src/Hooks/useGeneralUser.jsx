import useRole from "./useRole";

const useGeneralUser = () => {
    const [role, isRoleLoading] = useRole();
    const isGeneralUser = role === "generalUser";

    return [isGeneralUser, isRoleLoading];
};

export default useGeneralUser;