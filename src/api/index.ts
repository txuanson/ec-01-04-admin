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

  async delete(url: string): Promise<any> {
    return this.client.delete(url);
  }

  async login(data: { mEmail: string, mPassword: string }): Promise<any> {
    return this.client.post("/auth/login-admin", data);
  }

  async getListUser(): Promise<any> {
    return this.get("/user");
  }

  async getListProduct(): Promise<any> {
    return this.get("/product");
  }

  async getProduct(id: number): Promise<any> {
    return this.get(`/product/${id}`);
  }

  async addProduct(data: any): Promise<any> {
    return this.post("/product", data);
  }

  async editProduct(id: number, data: any): Promise<any> {
    return this.patch(`/product/${id}`, data);
  }

  async deleteProduct(id: number): Promise<any> {
    return this.delete(`/product/${id}`);
  }

  async getVariant(productId: number, sku: string): Promise<any> {
    return this.get(`/product/${productId}/variant/${sku}`);
  }

  async addVariant(productId: number, data: any): Promise<any> {
    return this.post(`/product/${productId}/variant`, data);
  }

  async editVariant(productId: number, sku: string, data: any): Promise<any> {
    return this.patch(`/product/${productId}/variant/${sku}`, data);
  }
  
  async deleteVariant(productId: number, sku: string): Promise<any> {
    return this.delete(`/product/${productId}/variant/${sku}`);
  }

  async getListCategory(): Promise<any> {
    return this.get("/category");
  }

  async getCategory(id: number): Promise<any> {
    return this.get(`/category/${id}`);
  }

  async addCategory(data: any): Promise<any> {
    return this.post("/category", data);
  }

  async deleteCategory(id: number): Promise<any> {
    return this.delete(`/category/${id}`);
  }

  async editCategory(id: number, data: any): Promise<any> {
    return this.patch(`/category/${id}`, data);
  }

  async getListOrigin(): Promise<any> {
    return this.get("/origin");
  }

  async getOrigin(id: number): Promise<any> {
    return this.get(`/origin/${id}`);
  }

  async addOrigin(data: any): Promise<any> {
    return this.post("/origin", data);
  }

  async deleteOrigin(id: number): Promise<any> {
    return this.delete(`/origin/${id}`);
  }

  async editOrigin(id: number, data: any): Promise<any> {
    return this.patch(`/origin/${id}`, data);
  }

  async getListManufacturer(): Promise<any> {
    return this.get("/manufacturer");
  }

  async getManufacturer(id: number): Promise<any> {
    return this.get(`/manufacturer/${id}`);
  }

  async addManufacturer(data: any): Promise<any> {
    return this.post("/manufacturer", data);
  }

  async deleteManufacturer(id: number): Promise<any> {
    return this.delete(`/manufacturer/${id}`);
  }

  async editManufacturer(id: number, data: any): Promise<any> {
    return this.patch(`/manufacturer/${id}`, data);
  }
}

export async function uploadImage(file: File): Promise<string> {
  const { data } = await axios.post(process.env.REACT_APP_LAMBDA_URL!, {
    ext: file.type.split('/')[1]
  }, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const newFile = new File([file], data.body.fields.key, { type: file.type });
  const form = new FormData();
  Object.keys(data.body.fields).forEach(key => {
    form.append(key, data.body.fields[key]);
  })
  form.append('file', newFile);
  await axios.post(data.body.url, form);

  return data.body.url + data.body.fields.key;
}