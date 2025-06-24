import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.29.155:5000/api',
 // ✅ your correct IP address
  timeout: 5000,
});

export default api;
