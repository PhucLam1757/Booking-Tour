import AxiosClient from "./AxiosClient"

const HotelAPI = {
    getAllCategory() {
        const url = `/hotel/category`;
        return AxiosClient.get(url);
    },

    updateCategory({cateId, cate_name}) {
        const url = `/hotel/category/${cateId}`;
        return AxiosClient.put(url, {cate_name});
    },

    createNewCategory({ cate_name }) {
        const url = `/hotel/category`;
        return AxiosClient.post(url, { cate_name });
    },

    deleteCategory(cateId) {
        const url = `/hotel/category/${cateId}`;
        return AxiosClient.delete(url);
    },

    addNewHotel(hotelData){
        const url = `/hotel`;
        return AxiosClient.post(url, { hotelData });
    },

    getAllHotel(){
        const url = `/hotel`;
        return AxiosClient.get(url);
    },

    deleteHotel(hotelId) {
        const url = `/hotel/${hotelId}`;
        return AxiosClient.delete(url);
    },

    getHotelById(hotelId){
        const url = `/hotel/${hotelId}`;
        return AxiosClient.get(url);
    },

    updateHotelData(hotelAllData){
        const url = `/hotel`;
        return AxiosClient.put(url, {hotelAllData});
    },

    getHotelByFilter({search, category, page, limit}){
        const url = `/hotel/filter`;
        return AxiosClient.post(url, {search, category, page, limit});

    },

    getReviewByHotelId({hotelId, limit, page}) {
        const url = `/hotel/review/${hotelId}?limit=${limit}&page=${page}`;
        return AxiosClient.get(url);
    },

    createCustomerReview({user_id, review, hotel_id}) {
        const url = `/hotel/review`;
        return AxiosClient.post(url, {user_id, review, hotel_id});
    },

    createUserBooking(bookingData){
        const url = `/hotel/booking`;
        return AxiosClient.post(url, {bookingData});
    },

    chargeBankingHotel({id, bookingData}){
        const url = `/hotel/booking/banking`;
        return AxiosClient.post(url, {id, bookingData});
    },

    getHotelBookingByFilter({category, hotel, status}) {
        const url = `/hotel/booking/filter`;
        return AxiosClient.post(url, {category, hotel, status});
    },

    getHotelByCategory(cateId) {
        const url = `/hotel/get-by-cate/${cateId}`;
        return AxiosClient.get(url);
    },

    getHotelBookingById(bookingId){
        const url = `/hotel/booking/id/${bookingId}`;
        return AxiosClient.get(url);
    },

    updateHotelBookingStatus({id, status, hotel_type, hotel_id}){
        const url = `/hotel/booking/status/${id}`;
        return AxiosClient.put(url, {status, hotel_type, hotel_id});
    },

    getBookingByFilterDate({fromDate, toDate}) {
        const url = `/hotel/booking/filter/date`;
        return AxiosClient.post(url, {fromDate, toDate});
    },

    getUserBooking (userId){
        const url = `/hotel/booking/user/${userId}`;
        return AxiosClient.get(url);
    },

    checkUserCanReview({user_id, hotel_id}) {
        const url = `/hotel/booking/user-can-review`
        return AxiosClient.post(url, {user_id, hotel_id});
    }
};
export default HotelAPI;
