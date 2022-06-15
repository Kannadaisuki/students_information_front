import axios from 'axios';

const baseURL = 'http://localhost:9571/student_information_back'

const server = axios.create({
    baseURL,
    timeout: 20000
})

export default server