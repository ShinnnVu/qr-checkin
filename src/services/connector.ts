import axios, { AxiosInstance } from "axios";
import { API_URL, TIME_OUT } from "../constants/apiContants";

export default class Connector {
    instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL: API_URL,
            timeout: TIME_OUT,
            withCredentials: true,
        });
        this.instance.interceptors.response.use(
            (response) => {
                return response;
            },
            (err) => {
                return Promise.reject(err);
            }
        )
    }

    setJWT = (token: string) => {
        this.instance.defaults.headers.common["Authorization"] = token;
    }

    request = (config: any) => {
        return this.instance.request(config);
    }
}

export enum Method {
    post = "post",
    get = "get",
}