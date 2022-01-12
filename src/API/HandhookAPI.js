import AxiosClient from "./AxiosClient"

const HandbookAPI = {
    getAll() {
        const url = `/handbook`;
        return AxiosClient.get(url);
    },

    getHandbookById(handbookId) {
        const url = `/handbook/${handbookId}`;
        return AxiosClient.get(url);
    },

    createNewHandbook({ handbook_name, handbook_desc, handbook_img }) {
        const url = `/handbook`;
        return AxiosClient.post(url, { handbook_name, handbook_desc, handbook_img });
    },

    deleteHandbookData(handbookId) {
        const url = `/handbook/${handbookId}`;
        return AxiosClient.delete(url);
    },

    updateHandbookData({ id, handbook_name, handbook_desc, handbook_img }) {
        const url = `/handbook/${id}`;
        return AxiosClient.put(url, { handbook_name, handbook_desc, handbook_img });
    },

};
export default HandbookAPI;
