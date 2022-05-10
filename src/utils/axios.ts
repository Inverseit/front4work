import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  // baseURL: process.env.API_SERVER_URL,
  baseURL: "http://localhost:3006/"
};

const client: AxiosInstance = axios.create(config);

export const isAxiosError = axios.isAxiosError;

export default client;