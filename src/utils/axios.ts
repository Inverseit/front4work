import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  baseURL: process.env.API_SERVER_URL,
};

const client: AxiosInstance = axios.create(config);

export default client;