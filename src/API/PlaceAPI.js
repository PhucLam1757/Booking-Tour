import AxiosClient from "./AxiosClient"

const PlaceAPI = {
    getAll() {
        const url = `/place`;
        return AxiosClient.get(url);
    },

    addNew({ place_name, country_id }) {
        const url = `/place`;
        return AxiosClient.post(url, {place_name, country_id});
    },

    deletePlace(id) {
        const url = `/place/${id}`;
        return AxiosClient.delete(url);
    },

    updatePlace({ id, place_name, country_id  }) {
        const url = `/place/${id}`;
        return AxiosClient.put(url, {place_name, country_id});
    },

};
export default PlaceAPI;
