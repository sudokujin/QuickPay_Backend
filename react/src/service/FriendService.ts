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

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default {
    createFriendRequest: function (senderId: number, receiverId: number, status: string) {
        return http.post('/friendrequest', { senderId, receiverId, status });
    },

    acceptFriendRequest: function (requestId: number) {
        return http.put(`/friendrequest/accept/${requestId}`);
    },

    rejectFriendRequest: function (requestId: number) {
        return http.put(`/friendrequest/reject/${requestId}`);
    },

    deleteFriendRequest: function (accountId: number, friendId: number) {
        return http.delete('/friendrequest', { params: { accountId, friendId } });
    },

    getFriendRequests: function (accountId: string) {
        return http.get(`/friendrequest/${accountId}`);
    },

    getFriendsByAccountId: function (accountId: number) {
        return http.get(`/friends/${accountId}`);
    },
};