import axios from 'axios';

const http = axios.create({
    baseURL:"http://localhost:9000"
});

export default {

    login(user : any) {
        return http.post('/login', user)
    },

    register(user : any) {
        return http.post('/register', user)
    }

}