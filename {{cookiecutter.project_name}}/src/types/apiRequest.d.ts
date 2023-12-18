interface IRequest<T = unknown> {
    method?: 'get' | 'post' | 'put' | 'delete' | 'patch';
    body?: T;
    config?: AxiosRequestConfig;
    url: string;
  }
  
  interface IServerResponse<T = unknown> {
    success: boolean;
    data: T;
  }
  
  interface IResponse<T = unknown> {
    success: boolean;
    data: IServerResponse<T>;
    message?: string;
    error?: string;
  }
  
  interface IResult<T = unknown> {
    success: boolean;
    errorType: 'server' | 'client' | null;
    data: T | null;
    message?: string;
  }
  
  interface IErrorResponse {
    message: string;
    success: boolean;
  }
  
  interface IErrorCatch<T = unknown> {
    success: boolean;
    errorType: string;
    data: T;
  }