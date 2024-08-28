import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000', // Thay thế cổng 5000 bằng cổng của server của bạn
});

export default axiosInstance;
