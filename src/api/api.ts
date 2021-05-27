import { ResultCodeEnum } from '../types';
import axios, { AxiosResponse } from 'axios';
import { ServerResponse } from 'http';
import { ProfileType } from '../types';

const axiosInstanse = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "4a8dd4f5-7770-4997-bc6a-37b7bd18c1cc"
    }
});

export const getUsers = (currentPage: number, pageSize: number) => {
    return axiosInstanse.get(`users/?page=${currentPage}&count=${pageSize}`)
        .then((response: AxiosResponse<any>) => response.data)
};

export const unFollowUser = (id: number) => {
    return axiosInstanse.delete(`/follow/${id}`)
        .then((response: AxiosResponse<any>)=> response.data)
};

export const followUser = (id: number) => {
    return axiosInstanse.post(`follow/${id}`)
        .then((response: AxiosResponse<any>) => response.data)
};



export type AuthMeResponseType = {
    data: {id: number, email: string, password: string, login: string},
    resultCode: ResultCodeEnum,
    messages: Array<string>
};

export const authMe = () => {
    return axiosInstanse.get<AuthMeResponseType>(`auth/me`)
        .then((response: AxiosResponse<any>) => response.data)
};

export const getProfile = (userId: number) => {
    return axiosInstanse.get<ProfileType>(`profile/${userId}`)
        .then((response: AxiosResponse<any>) => response.data)
};

export const getStatus = (userId: number) => {
    return axiosInstanse.get(`profile/status/${userId}`)
        .then((response: AxiosResponse<any>) => response.data)
};

type UpdateStatusType = {

};

export const updateStatus = (status: string) => {
    return axiosInstanse.put(`profile/status/`, { status })
        .then((response: AxiosResponse<any>) => response.data)
};

type LoginResponseType = {
    data: {userId: number},
    resultCode: ResultCodeEnum,
    messages: Array<string>
};


export const login = (email: string, password: string, rememberMe: boolean) => {
    return axiosInstanse.post<LoginResponseType>(`auth/login`, { email, password, rememberMe })
        .then((response: AxiosResponse<any>) => response.data)
};

export const logout = () => {
    return axiosInstanse.delete(`auth/login`)
        .then((response: AxiosResponse<any>) => response.data)
};