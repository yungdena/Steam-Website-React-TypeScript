import axios, { AxiosRequestConfig } from "axios";
import { IApp } from "../types/app.type";

const API_URL = "http://localhost:3000/api/apps";



export class AppsService {
  async getAllApps() {
    const response = await axios.get(API_URL);
    return response.data;
  };

  async getAppByTitle(title: string) {
    const response = await axios.get(`${API_URL}/${title}`);
    return response.data;
  };

  async createApp(app: IApp) {
    const response = await axios.post(API_URL, app);
    return response.data;
  };

  async deleteApp(id: string) {
    const config: AxiosRequestConfig = {
      params: {
        id: id,
      },
    };
    const response = await axios.delete(API_URL, config);
    return response.data;
  };
}