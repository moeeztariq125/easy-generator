import { ISignInRequest, ISignUpRequest } from './apiInterfaces';
import { api } from './axiosInstance';

const checkUser = (email: string) => api.post('/api/users/check', { email });
const signUp = (data: ISignUpRequest) => api.post('/api/users/sign-up', data);
const signIn = (data: ISignInRequest) => api.post('/api/users/sign-in', data);

export { checkUser, signIn, signUp };
