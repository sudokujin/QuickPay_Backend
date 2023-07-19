import axios from 'axios';

const http = axios.create({
    baseURL:"http://localhost:9000"
});

http.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwtToken');

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default {
    createAccount(account : any) {
        return http.post('/account', account);
    },

    updateBalance(account : any) {
        return http.put('/account', account);
    },

    getAccountByAccountID(accountId : number) {
        return http.get(`/account/${accountId}`);
    },

    getAccountByUserID(userId: number) {
        return http.get(`/account/user/${userId}`);
    },

    deleteAccount(account: any) {
        return http.delete('/account', account);
    }
}
