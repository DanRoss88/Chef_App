export interface IApiError extends Error {
    statusCode: number;
  }
  
  class ApiError extends Error implements IApiError {
    constructor(message: string, public readonly statusCode: number) {
      super(message);
      this.name = 'ApiError';
    }
  }
  
  export { ApiError };