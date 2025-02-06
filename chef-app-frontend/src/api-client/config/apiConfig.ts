import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export class ApiConfig {
  private baseURL: string;

  constructor() {
    this.baseURL = "http://localhost:3010";
  }

  public getBaseURL(): string {
    return this.baseURL;
  }

  public createAxiosInstance(config?: Partial<AxiosRequestConfig>): AxiosInstance {
    const instance = axios.create({
      baseURL: this.getBaseURL(),
      timeout: 1000,
      headers: {
        "Content-Type": "application/json",
      },
      ...config,
    });

    // Add interceptors here if needed
    return instance;
  }

  public setBaseURL(newBaseURL: string): void {
    this.baseURL = newBaseURL;
  }
}
