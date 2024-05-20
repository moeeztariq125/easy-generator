import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { FC, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/userService';
export const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const AxiosInterceptor: FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  useEffect(() => {
    const requestInterceptor = (config: InternalAxiosRequestConfig<any>) => {
      if (accessToken) {
        config.headers['Authorization'] = accessToken;
      }
      return config;
    };
    const responseInterceptor = (response: AxiosResponse<any, any>) => {
      return response;
    };
    const errInterceptor = (error: any) => {
      const errorMessage = error?.response?.data?.errors?.[0]?.message ?? error.response.message;
      error.errorMessage = errorMessage;
      if (error?.response?.status === 401) {
        userService.logOut();
        navigate('/');
      }

      return Promise.reject(error);
    };
    const ReqInterceptor = api.interceptors.request.use(requestInterceptor);
    const ResInterceptor = api.interceptors.response.use(responseInterceptor, errInterceptor);

    return () => {
      api.interceptors.response.eject(ResInterceptor);
      api.interceptors.request.eject(ReqInterceptor);
    };
  }, [navigate]);

  return children;
};
export { AxiosInterceptor };
