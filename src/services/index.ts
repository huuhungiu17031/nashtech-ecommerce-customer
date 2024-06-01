import axios from 'axios';
const { VITE_BASE_URL } = import.meta.env;

const autoFetch = axios.create({
  baseURL: VITE_BASE_URL,
});

export { autoFetch };
export * from './queries';
export * from './api';
