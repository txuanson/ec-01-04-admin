import { message } from "antd";
import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";
import { useContext } from "react";
import { AppContext, ContextType } from "../context";

let instance: Api;

export class Api {
  private client!: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.REACT_APP_BACKEND,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.client.interceptors.request.use(
      config => {
        const token = Cookies.get('token') || '';

        if (config.headers && token) {
          config.headers["Authorization"] = 'Bearer ' + token;
        }

        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );

    this.client.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          useContext<ContextType>(AppContext).logout();
        }
        return message.error(error.response.data.message);
      }
    )
  }

  static getInstance(): Api {
    if (!instance) {
      instance = new Api();
    }
    return instance;
  }

  async get(url: string): Promise<any> {
    return this.client.get(url);
  }

  async post(url: string, data: any): Promise<any> {
    return this.client.post(url, data);
  }

  async patch(url: string, data: any): Promise<any> {
    return this.client.patch(url, data);
  }

  async login(data: { mEmail: string, mPassword: string }): Promise<any> {
    return this.client.post("/login", data);
  }

  async getListUser(): Promise<any> {
    return this.client.get("/user");
  }

  async getListProduct(): Promise<any> {
    return this.client.get("/product");
  }

  async getListCategory(): Promise<any> {
    return this.client.get("/category");
  }

  async getCategory(id: number): Promise<any> {
    return this.client.get(`/category/${id}`);
  }

  async editCategory(id: number, data: any): Promise<any> {
    return this.client.patch(`/category/${id}`, data);
  }

  async getListOrigin(): Promise<any> {
    return this.client.get("/origin");
  }

  async getListManufacturer(): Promise<any> {
    return this.client.get("/manufacturer");
  }


}