import AxiosClient from "./AxiosClient"

const UserAPI = {
    createNewUser ({user_name, user_email, user_phone, user_address, user_password}){
        const url = `/user/user-signup`;
        return AxiosClient.post(url, {user_name, user_email, user_phone, user_address, user_password})

    }
};
export default UserAPI;
