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

    login(user : any) {
        return http.post('/login', user)
    },

    register(user : any) {
        return http.post('/register', user)
    },

    getUserId() {
        return http.get('/user/id');
    },

    getUserByUsername(username: string) {
        return http.get(`/user/${username}`);
    }

}