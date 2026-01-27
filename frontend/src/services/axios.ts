import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
 });

api.interceptors.response.use(
    res => res,
    async error => {
        if (error.response && error.response.status === 401) {
            try {
                await api.post('/auth/refresh');
                return api(error.config);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);           
});

export default api;