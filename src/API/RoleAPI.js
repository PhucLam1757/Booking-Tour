import AxiosClient from "./AxiosClient"

const RoleAPI = {
    getAll(){
        const url = `/role`;
        return AxiosClient.get(url);
    },

    createNewRole({name, role_function}){
        const url = `/role`;
        return AxiosClient.post(url, {name, role_function});
    },

    deleteRole(roleId) {
        const url = `/role/${roleId}`;
        return AxiosClient.delete(url);
    },

    updateRole({id, name, role_function}) {
        const url = `/role/${id}`;
        return AxiosClient.put(url, { name, role_function });
    }
};
export default RoleAPI;
