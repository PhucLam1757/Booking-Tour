import AxiosClient from "./AxiosClient"

const FavouriteAPI = {
    getAllData(userId) {
        const url = `/favourite/data/${userId}`;
        return AxiosClient.get(url);
    },

    addNew({ user_id, tour_id}) {
        const url = `/favourite`;
        return AxiosClient.post(url, {user_id, tour_id});
    },

    deleteFavourite({user_id, tour_id}){
        const url = `/favourite?user_id=${user_id}&tour_id=${tour_id}`;
        return AxiosClient.delete(url);
    },

    getId(userId) {
        const url = `/favourite/id/${userId}`;
        return AxiosClient.get(url);
    },

};
export default FavouriteAPI;
