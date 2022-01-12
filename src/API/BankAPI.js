import AxiosClient from "./AxiosClient"

const BankAPI = {
    getAll() {
        const url = `/bank`;
        return AxiosClient.get(url);
    },

    addNew({ card_name, card_number, card_author }) {
        const url = `/bank`;
        return AxiosClient.post(url, {card_name, card_number, card_author});
    },

    deleteBankInfo(id) {
        const url = `/bank/${id}`;
        return AxiosClient.delete(url);
    },

    updateBankInfo({ id, card_name, card_number, card_author }) {
        const url = `/bank/${id}`;
        return AxiosClient.put(url, {card_name, card_number, card_author});
    },

};
export default BankAPI;
