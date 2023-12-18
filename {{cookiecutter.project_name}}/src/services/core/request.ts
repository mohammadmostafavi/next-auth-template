import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
// import { isBrowser } from '@/libs/helpers';
import  $axios  from './$axios';

/**
 * @template T => Final Data (Result)
 * @template B => Request Body (Body)
 */
export const sendRequest = async <T = unknown, B = Record<string, unknown>>({
  method = 'get',
  body,
  url,
  config,
  ...props
}: IRequest<B>): Promise<IResult<T>> => {
  let response: AxiosResponse<IResponse<T>>;
  try {
    const configParams: AxiosRequestConfig = {
      ...config,
      ...props,
    };
    switch (method) {
      case 'post':
      case 'patch':
      case 'put':
        response = await $axios[method](url, body, configParams);
        break;
      case 'delete':
        response = await $axios.delete(url, {
          data: body,
          ...configParams,
        });
        break;
      case 'get':
      default:
        response = await $axios.get(url, configParams);
        break;
    }
    const isSuccess = response.status >= 200 && response.status < 400;
    if (isSuccess) {
      return {
        success: isSuccess,
        errorType: null,
        data: response.data as unknown as T,
        message: response.data.message,
      };
    }
    throw {
      success: isSuccess,
      errorType: 'server',
      data: response as unknown as T,
      message: response.data.message || 'Api call has been crashed.',
    };
  } catch (err) {
    const error = err as AxiosError<IErrorResponse>;
    // if (isBrowser()) {
    //   console.error('Error', error.message);

    //   // toast({
    //   //   title: 'Error',
    //   //   description: `Api call has been crashed.`,
    //   //   status: 'error',
    //   // });
    // }
    throw {
      success: false,
      errorType: 'client',
      data: error.response || null,
    };
  }
};