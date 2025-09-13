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
  console.log('[AXIOS] Headers:', config.headers);
  console.log('[AXIOS] Dados:', config.data);
  console.log('[AXIOS] Parametros:', config.params);

  console.groupEnd();

  return config;
}, error => {
  console.error('%c[AXIOS] Erro no request:', 'color: #F44336;', error);
  return Promise.reject(error);
});

// Interceptador de RESPONSES para debugar
api.interceptors.response.use(response => {
  console.log('[AXIOS] Resposta recebida:', response.status, response.data);
  console.log('[AXIOS] Headers:', response.headers);

  console.groupEnd();

  return response;
}, error => {
  console.error('[AXIOS] Erro na resposta:', {
    URL: error.config?.url,
    Status: error.response?.status,
    Data: error.response?.data,
    Code: error.code,
    Message: error.message
  });
  return Promise.reject(error);
});

export default api;