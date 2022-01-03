import AxiosClient from "./AxiosClient"

const ContactAPI = {
    getAll() {
        const url = `/contact`;
        return AxiosClient.get(url);
    },

    addNew({ id, address, number_phone, email }) {
        const url = `/contact`;
        return AxiosClient.post(url, {id, address, number_phone, email});
    },

    deleteContact(id) {
        const url = `/contact/${id}`;
        return AxiosClient.delete(url);
    },

    updateContact({ id, address, number_phone, email }) {
        const url = `/contact/${id}`;
        return AxiosClient.put(url, {address, number_phone, email});
    },

};
export default ContactAPI;
