// src/config/axiosConfig.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // porta spring-boot
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptador de REQUESTS para debugar
api.interceptors.request.use(config => {
  console.log('[AXIOS] Enviando para:', config.method?.toUpperCase(), config.url);
  console.log('[AXIOS] Dados:', config.data);
  return config;
}, error => {
  console.error('[AXIOS] Erro no request:', error);
  return Promise.reject(error);
});

// Interceptador de RESPONSES para debugar
api.interceptors.response.use(response => {
  console.log('[AXIOS] Resposta recebida:', response.status, response.data);
  return response;
}, error => {
  console.error('[AXIOS] Erro na resposta:', {
    URL: error.config?.url,
    Status: error.response?.status,
    Data: error.response?.data
  });
  return Promise.reject(error);
});

export default api;