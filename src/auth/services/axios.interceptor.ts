import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    timeout: 100000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const setUpAxiosInterceptors = (logout) => {
    axiosInstance.interceptors.request.use(
        async (request) => {
           
            return request;
        },
        (error) => {
            // Handle request errors here
            return Promise.reject(error);
        }
    );
};

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle response errors here
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        return Promise.reject(error);
    }
);
export default axiosInstance;

