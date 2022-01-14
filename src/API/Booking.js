import AxiosClient from "./AxiosClient"

const BookingAPI = {
    getAll() {
        const url = `/booking`;
        return AxiosClient.get(url);
    },

    addNew({ user_id, tour_id, name, address, email, phone, total_price, payment_method, total_child, total_adult }) {
        const url = `/booking`;
        return AxiosClient.post(url, {user_id, tour_id, name, address, email, phone, total_price, payment_method, total_child, total_adult});
    },

    getBookingByFilter({category, tour, status}) {
        const url = `/booking/filter`;
        return AxiosClient.post(url, {category, tour, status});
    },

    deleteBooking(id) {
        const url = `/booking/${id}`;
        return AxiosClient.delete(url);
    },

    getBookingById(bookingId) {
        const url = `/booking/${bookingId}`;
        return AxiosClient.get(url);
    },

    updateTourStatus({id, status}){
        const url = `/booking/status/${id}`;
        return AxiosClient.put(url, {status});
    },

    getUserBooking (userId){
        const url = `/booking/user/${userId}`;
        return AxiosClient.get(url);
    },

    getBookingByFilterDate({fromDate, toDate}) {
        const url = `/booking/filter/date`;
        return AxiosClient.post(url, {fromDate, toDate});
    },

    chargeBanking({id, amount, userInfo, totalChild, totalAdult, paymentMethod, tourId, userId}) {
        const url = `/booking/charge-banking`;
        return AxiosClient.post(url, {id, amount, userInfo, totalChild, totalAdult, paymentMethod, tourId, userId});
    },

    checkUserCanReview({user_id, tour_id}) {
        const url = `/booking/user-can-review`
        return AxiosClient.post(url, {user_id, tour_id});
    }
};
export default BookingAPI;
