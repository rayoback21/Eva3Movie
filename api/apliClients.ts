import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClients = axios.create({
  baseURL: 'http://localhost:8081',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClients.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('jwt');
    console.log('Token:', token); // Agrega esta línea para verificar el token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);


export default apiClients;