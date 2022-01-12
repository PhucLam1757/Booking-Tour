import AxiosClient from "./AxiosClient"

const ServiceAPI = {
    getAll(limit,offset) {
        const url = `/service?limit=${limit}&offset=${offset}`;
        return AxiosClient.get(url);
    },

    getServiceById(serviceId) {
        const url = `/service/${serviceId}`;
        return AxiosClient.get(url);
    },

    createNewService({ service_name, service_desc, service_img }) {
        const url = `/service`;
        return AxiosClient.post(url, { service_name, service_desc, service_img });
    },

    deleteServiceData(serviceId) {
        const url = `/service/${serviceId}`;
        return AxiosClient.delete(url);
    },

    updateServiceData({ id, service_name, service_desc, service_img }) {
        const url = `/service/${id}`;
        return AxiosClient.put(url, { service_name, service_desc, service_img });
    },
};
export default ServiceAPI;
