import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { setupCache } from 'axios-cache-adapter';

// Create `axios-cache-adapter` instance
const cache = setupCache({
  maxAge: 15 * 60 * 1000,
  exclude: {
    query: false
  }
})

const config: AxiosRequestConfig = {
  // baseURL: process.env.API_SERVER_URL,
  baseURL: "http://localhost:3006/",
  adapter: cache.adapter
};

const client: AxiosInstance = axios.create(config);

export const isAxiosError = axios.isAxiosError;

export default client;