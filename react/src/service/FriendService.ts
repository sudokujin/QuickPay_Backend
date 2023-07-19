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
    createFriendRequest(accountId : number, friendId : number, status: string) {
        return http.post('/friendrequest', accountId, friendId, status);
    },

    acceptFriendRequest: function (accountId: number, friendId: number, status: string) {
        return http.put('/friendrequest/accept', accountId, friendId, status);
    },

    rejectFriendRequest: function (accountId: number, friendId: number, status: string) {
        return http.put('/friendrequest/reject', accountId, friendId, status);
    },

    deleteFriendRequest: function (accountId: number, friendId: number) {
        return http.delete('/friendrequest', accountId, friendId);
    },

    getFriendRequestsByAccountId: function (accountId: number) {
        return http.get(`/friendrequest/${accountId}`);
    }

}