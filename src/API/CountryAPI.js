import AxiosClient from "./AxiosClient"

const CountryAPI = {
    getAll() {
        const url = `/country`;
        return AxiosClient.get(url);
    },

    addNew({ name }) {
        const url = `/country`;
        return AxiosClient.post(url, {name});
    },

    deleteCountry(id) {
        const url = `/country/${id}`;
        return AxiosClient.delete(url);
    },

    updateCountry({ id, name }) {
        const url = `/country/${id}`;
        return AxiosClient.put(url, {name});
    },

};
export default CountryAPI;
