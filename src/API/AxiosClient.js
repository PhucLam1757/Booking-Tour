import axios from 'axios';

export const AxiosClient = axios.create({
    baseURL: 'https://booking-tourr.herokuapp.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});
export default AxiosClient