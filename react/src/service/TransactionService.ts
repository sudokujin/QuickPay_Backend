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
    createTransaction(transaction : any) {
        return http.post('/transaction', transaction);
    },

    updateTransaction(transaction : any) {
        return http.put('/transaction', transaction);
    },

    getAllTransactions(accountId: number) {
        return http.get(`/transaction/${accountId}`);
    }
}