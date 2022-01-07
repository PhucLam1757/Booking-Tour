import AxiosClient from "./AxiosClient"

const ReviewAPI = {
    getReviewByTourId({tourId, limit, page}) {
        const url = `/review/${tourId}?limit=${limit}&page=${page}`;
        return AxiosClient.get(url);
    },

    createCustomerReview({user_id, review, tour_id}) {
        const url = `/review`;
        return AxiosClient.post(url, {user_id, review, tour_id});
    }

};
export default ReviewAPI;
