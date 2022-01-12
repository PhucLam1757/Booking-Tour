import AxiosClient from "./AxiosClient"

const TourAPI = {
    getAll() {
        const url = `/tour`;
        return AxiosClient.get(url);
    },

    getTourById(tourId) {
        const url = `/tour/${tourId}`;
        return AxiosClient.get(url);
    },

    addNew(tourData) {
        const url = `/tour`;
        return AxiosClient.post(url, {tourData});
    },

    deleteTour(tourId) {
        const url = `/tour/${tourId}`;
        return AxiosClient.delete(url);
    },

    updateTour(tourData, tourId) {
        const url = `/tour/${tourId}`
        return AxiosClient.put(url, {tourData})
    },

    getTourByFilter({search, category, dateGo, dateReturn, page, limit}) {
        const url = `/tour/filter/data?search=${search}&category=${category}&dateGo=${dateGo}&dateReturn=${dateReturn}&page=${page}&limit=${limit}`
        return AxiosClient.get(url);
    },

    getTourIdByCategory(categoryId){
        const url = `/tour/get-category/${categoryId}`
        return AxiosClient.get(url);
    }

};
export default TourAPI;
