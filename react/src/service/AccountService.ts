import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:9000',
});

http.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwtToken');

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        // Set the content type header to 'application/json'
        config.headers['Content-Type'] = 'application/json';

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default {
    createAccount(account) {
        return http.post('/account', account);
    },

    updateBalance(balance : number, accountId : number) {
        return http.put(`/account/${accountId}`, balance, accountId);
    },

    getAccountByAccountID(accountId) {
        return http.get(`/account/${accountId}`);
    },

    getAccountByUserID(userId) {
        return http.get(`/account/user/${userId}`);
    },

    deleteAccount(account) {
        return http.delete('/account', account);
    },
};