import AxiosClient from "./AxiosClient"

const UserAPI = {
    createNewUser ({user_name, user_email, user_phone, user_address, user_password, role}){
        const url = `/user/user-signup`;
        return AxiosClient.post(url, {user_name, user_email, user_phone, user_address, user_password, role})

    },

    userLogin({email, password}) {
        const url = `/user/user-login`;
        return AxiosClient.post(url, {email, password})
    },

    verifyEmail(email) {
        const url = `/user/verify`;
        return AxiosClient.post(url, {email})
    },

    getAll() {
        const url = `/user`;
        return AxiosClient.get(url)
    },

    updateAccount({user_id ,user_name, user_email, user_phone, user_address, user_password, role}){
        const url = `/user/update/${user_id}`;
        return AxiosClient.put(url, {user_name, user_email, user_phone, user_address, user_password, role})
    },

    deleteAccount(userId) {
        const url = `/user/${userId}`;
        return AxiosClient.delete(url)
    },

    getUserInfo(userId) {
        const url = `/user/${userId}`;
        return AxiosClient.get(url)
    },

    updateUserInfo({id, email, name, address, phone_number}) {
        const url = `/user/${id}`;
        return AxiosClient.post(url, {email, name, address, phone_number} )
    },

};
export default UserAPI;
