
import api from "./axios";

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  signup: async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { name, email, password});
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
  refresh: async () => {
    const response = await api.post('/auth/refresh');
    return response.data;
  },
  
};