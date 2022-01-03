import AxiosClient from "./AxiosClient"

const TourCategoryAPI = {
    getAll() {
        const url = `/category`;
        return AxiosClient.get(url);
    },

    addNew({ name }) {
        const url = `/category`;
        return AxiosClient.post(url, {name});
    },

    deleteCategory(id) {
        const url = `/category/${id}`;
        return AxiosClient.delete(url);
    },

    updateCategory({ id, name }) {
        const url = `/category/${id}`;
        return AxiosClient.put(url, {name});
    },

};
export default TourCategoryAPI;
