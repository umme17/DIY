import {api} from '../lib/apiConfig';

export const signup = async(data: {firstName :string, lastName: string, email: string, password: string}) => {
    const res = await api.post('/auth/sign-up', data);
    return res.data;
}

export const login = async( data : {email: string, password: string}) => {
    const res = await api.post('/auth/login', data);
    return res.data;
}

export const logout = async() => {
     return await api.post ('/auth/logout');
}

export const refreshToken = async () => {
    return await api.post ('/auth/refresh-token');
}